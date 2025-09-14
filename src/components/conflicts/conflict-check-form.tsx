'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { detectAndExplainConflicts, DetectAndExplainConflictsOutput } from '@/ai/flows/detect-and-explain-conflicts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import ConflictResults from './conflict-results';

const formSchema = z.object({
  timetableData: z.string().min(10, 'Please provide timetable data.'),
  facultyWorkloadPolicies: z.string().min(10, 'Please provide workload policies.'),
});

const defaultValues = {
  timetableData: `Monday:\n9-10am: PSY101, Room 101, Dr. Khan\n9-10am: CS101, Room 102, Dr. Reed\n10-11am: MATH101, Room 101, Prof. Tan\n\nTuesday:\n9-10am: PSY101, Room 101, Dr. Khan`,
  facultyWorkloadPolicies: `Maximum 15 hours per week per faculty. No more than 3 consecutive hours of teaching. At least a 1-hour break after 2 hours of teaching.`,
};

export function ConflictCheckForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectAndExplainConflictsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await detectAndExplainConflicts(values);
      setResult(response);
    } catch (e) {
      setError('An error occurred during conflict detection. Please try again.');
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
              <CardTitle>Detect Timetable Conflicts</CardTitle>
              <CardDescription>
                Paste your timetable data and faculty policies to detect and explain any scheduling conflicts.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="timetableData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timetable Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste raw timetable data here..." {...field} rows={8} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facultyWorkloadPolicies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faculty Workload Policies</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Max hours, break policies..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Check for Conflicts
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {error && <div className="text-destructive">{error}</div>}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4">Analyzing timetable...</p>
        </div>
      )}
      {result && <ConflictResults result={result} />}
    </div>
  );
}
