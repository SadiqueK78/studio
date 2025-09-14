'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestOptimalSchedule, SuggestOptimalScheduleOutput } from '@/ai/flows/suggest-optimal-schedule';
import { extractTimetableData } from '@/ai/flows/extract-timetable-data';
import mammoth from 'mammoth';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, UploadCloud } from 'lucide-react';
import TimetableDisplay from './timetable-display';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  courseRequirements: z.string().min(10, 'Please provide more details.'),
  facultyAvailability: z.string().min(10, 'Please provide more details.'),
  roomCapacities: z.string().min(10, 'Please provide more details.'),
  studentData: z.string().min(10, 'Please provide more details.'),
  curriculumStructure: z.string().min(10, 'Please provide more details.'),
  teachingPracticeSchedules: z.string().optional(),
  fieldWorkInternshipsAndProjectComponents: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
    courseRequirements: 'B.Ed. 1st Sem: 4 core courses (4 credits each), 2 pedagogy courses (4 credits each). FYUP CS 1st Sem: 3 core (4 credits), 1 minor (3 credits), 1 skill (2 credits).',
    facultyAvailability: 'Dr. Sharma: Mon-Wed 9am-5pm, expertise in Physics. Prof. Gupta: Tue-Fri 10am-4pm, expertise in CS.',
    roomCapacities: 'Room 101: 60 capacity, projector. Lab 1: 30 capacity, computers. Hall A: 120 capacity.',
    studentData: '120 students in B.Ed 1st Sem. 80 in FYUP CS 1st Sem. Elective choices: 40 for Psychology minor, 30 for Data Science skill course.',
    curriculumStructure: 'Course Codes: PHY101 (4 credits, T/P: 3/1), CS101 (4 credits, T/P: 3/1).',
    teachingPracticeSchedules: 'B.Ed. 3rd Sem Teaching Practice: 4 weeks in Oct-Nov. No classes for them.',
    fieldWorkInternshipsAndProjectComponents: 'FYUP CS 7th Sem Project: 8 hours/week. Internships in summer.',
};

export function GenerateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<SuggestOptimalScheduleOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.docx')) {
        toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Please upload a .docx Word document.",
        });
        return;
    }

    setIsExtracting(true);
    try {
        const arrayBuffer = await file.arrayBuffer();
        const { value: textContent } = await mammoth.extractRawText({ arrayBuffer });
        
        const extractedData = await extractTimetableData({ textContent });

        // Update form fields with extracted data
        Object.keys(extractedData).forEach(key => {
            const formKey = key as keyof FormSchemaType;
            if (form.getValues(formKey) !== extractedData[formKey] && extractedData[formKey]) {
              form.setValue(formKey, extractedData[formKey], { shouldValidate: true });
            }
        });

        toast({
          title: "Data Extracted",
          description: "The form fields have been populated from the document.",
        });

    } catch (e) {
        console.error("Error processing file:", e);
        toast({
            variant: "destructive",
            title: "Extraction Failed",
            description: "Could not extract data from the document. Please try again.",
        });
    }
    setIsExtracting(false);

    // Reset file input
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await suggestOptimalSchedule({
        ...values,
        teachingPracticeSchedules: values.teachingPracticeSchedules || '',
        fieldWorkInternshipsAndProjectComponents: values.fieldWorkInternshipsAndProjectComponents || '',
      });
      setResult(response);
    } catch (e) {
      setError('An error occurred while generating the timetable. Please try again.');
      console.error(e);
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Generate Optimal Timetable</CardTitle>
                  <CardDescription>
                    Provide the necessary data below, or upload a Word document to auto-fill the form.
                  </CardDescription>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".docx"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isExtracting}
                >
                  {isExtracting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <UploadCloud className="mr-2 h-4 w-4" />
                  )}
                  Upload .docx
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="courseRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Requirements</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Subject combinations, credit hours..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facultyAvailability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faculty Availability & Expertise</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Workload, availability, expertise..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roomCapacities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room & Lab Capacities</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Room numbers, capacities, equipment..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="studentData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Elective choices, enrolled credits..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="curriculumStructure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curriculum Structure</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Course codes, credit split (theory/practical)..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="teachingPracticeSchedules"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teaching Practice Schedules (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., For B.Ed. and M.Ed. programs..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="fieldWorkInternshipsAndProjectComponents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Work / Internships (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Schedules for internships, projects..." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || isExtracting}>
                {(isLoading || isExtracting) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Timetable
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {error && <div className="text-destructive">{error}</div>}
      {result && <TimetableDisplay result={result} />}
    </div>
  );
}
