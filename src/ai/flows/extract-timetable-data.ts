'use server';
/**
 * @fileOverview Extracts structured timetable data from raw text content.
 *
 * - extractTimetableData - Parses a string and extracts timetable-related information.
 * - ExtractTimetableDataInput - The input type for the extractTimetableData function.
 * - ExtractTimetableDataOutput - The return type for the extractTimetableData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTimetableDataInputSchema = z.object({
  textContent: z
    .string()
    .describe(
      'The raw text content from a document containing timetable information.'
    ),
});
export type ExtractTimetableDataInput = z.infer<
  typeof ExtractTimetableDataInputSchema
>;

const ExtractTimetableDataOutputSchema = z.object({
  courseRequirements: z
    .string()
    .describe('A description of course requirements, including subject combinations and credit hours.'),
  facultyAvailability: z
    .string()
    .describe('Information about faculty availability, workload, and expertise.'),
  roomCapacities: z
    .string()
    .describe('Details on room and lab availability and their capacities.'),
  studentData: z
    .string()
    .describe('Student data including elective choices and enrolled credits.'),
  curriculumStructure: z
    .string()
    .describe('Curriculum structure including course codes, credits and theory/practical split'),
  teachingPracticeSchedules: z
    .string()
    .describe('Teaching practice schedules especially relevant for B.Ed. and M.Ed.'),
  fieldWorkInternshipsAndProjectComponents: z
    .string()
    .describe('Information on field work, internships and project components'),
});

export type ExtractTimetableDataOutput = z.infer<
  typeof ExtractTimetableDataOutputSchema
>;

export async function extractTimetableData(
  input: ExtractTimetableDataInput
): Promise<ExtractTimetableDataOutput> {
  return extractTimetableDataFlow(input);
}

const extractTimetableDataPrompt = ai.definePrompt({
  name: 'extractTimetableDataPrompt',
  input: {schema: ExtractTimetableDataInputSchema},
  output: {schema: ExtractTimetableDataOutputSchema},
  prompt: `You are an AI assistant designed to extract and structure academic timetable information from raw text.

  Analyze the following text content and populate the corresponding fields. If information for a field is not present, leave it as an empty string.

  Text Content:
  {{{textContent}}}

  Extract the data into the following categories:
  - courseRequirements: All details about courses, subjects, and credits.
  - facultyAvailability: All details about professors, their availability, and what they teach.
  - roomCapacities: All details about rooms, labs, their capacity, and equipment.
  - studentData: All details about student enrollment numbers and their course choices.
  - curriculumStructure: All details about the structure of programs and course codes.
  - teachingPracticeSchedules: Information related to teaching practice for programs like B.Ed.
  - fieldWorkInternshipsAndProjectComponents: Details about internships, field work, or long-term projects.
  `,
});

const extractTimetableDataFlow = ai.defineFlow(
  {
    name: 'extractTimetableDataFlow',
    inputSchema: ExtractTimetableDataInputSchema,
    outputSchema: ExtractTimetableDataOutputSchema,
  },
  async input => {
    const {output} = await extractTimetableDataPrompt(input);
    return output!;
  }
);
