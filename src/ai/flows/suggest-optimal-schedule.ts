'use server';

/**
 * @fileOverview AI agent that suggests an optimal schedule based on course requirements, faculty availability, and room capacities.
 *
 * - suggestOptimalSchedule - A function that generates an optimized draft timetable.
 * - SuggestOptimalScheduleInput - The input type for the suggestOptimalSchedule function.
 * - SuggestOptimalScheduleOutput - The return type for the suggestOptimalSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalScheduleInputSchema = z.object({
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
export type SuggestOptimalScheduleInput = z.infer<
  typeof SuggestOptimalScheduleInputSchema
>;

const SuggestOptimalScheduleOutputSchema = z.object({
  timetable: z
    .string()
    .describe('An optimized draft timetable in a readable format.'),
  conflicts: z
    .string()
    .optional()
    .describe('A list of any scheduling conflicts detected.'),
  recommendations: z
    .string()
    .optional()
    .describe('Recommendations for resolving any scheduling issues.'),
});
export type SuggestOptimalScheduleOutput = z.infer<
  typeof SuggestOptimalScheduleOutputSchema
>;

export async function suggestOptimalSchedule(
  input: SuggestOptimalScheduleInput
): Promise<SuggestOptimalScheduleOutput> {
  return suggestOptimalScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalSchedulePrompt',
  input: {schema: SuggestOptimalScheduleInputSchema},
  output: {schema: SuggestOptimalScheduleOutputSchema},
  prompt: `You are an AI assistant helping generate an optimal academic timetable.

  Analyze the following data to create a conflict-free timetable:

  Course Requirements: {{{courseRequirements}}}
  Faculty Availability: {{{facultyAvailability}}}
  Room Capacities: {{{roomCapacities}}}
  Student Data: {{{studentData}}}
  Curriculum Structure: {{{curriculumStructure}}}
  Teaching Practice Schedules: {{{teachingPracticeSchedules}}}
  Field Work, Internships, and Project Components: {{{fieldWorkInternshipsAndProjectComponents}}}

  Ensure the timetable adheres to NEP 2020 guidelines, accommodates various course types (Major, Minor, Skill-Based, Ability Enhancement, Value-Added), and prevents scheduling conflicts.

  If any conflicts are detected, please list them and provide recommendations for resolution.

  Return the timetable in a well-formatted, readable string.
  Include detected conflicts and recommendations for the admin to review.
  `,
});

const suggestOptimalScheduleFlow = ai.defineFlow(
  {
    name: 'suggestOptimalScheduleFlow',
    inputSchema: SuggestOptimalScheduleInputSchema,
    outputSchema: SuggestOptimalScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
