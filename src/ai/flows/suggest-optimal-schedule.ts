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

const TimetableEntrySchema = z.object({
  day: z.string().describe('Day of the week (e.g., Monday).'),
  time: z.string().describe('Time slot (e.g., 9:00 AM - 10:00 AM).'),
  course: z.string().describe('Course name or code.'),
  room: z.string().describe('Room or lab number.'),
  faculty: z.string().describe('Faculty member assigned.'),
  program: z.string().describe('Program or semester (e.g., B.Ed. 1st Sem).'),
});

const SuggestOptimalScheduleOutputSchema = z.object({
  timetable: z.array(TimetableEntrySchema).describe('An array of timetable entries representing the optimized draft timetable.'),
  conflicts: z.array(z.string()).optional().describe('A list of any scheduling conflicts detected.'),
  recommendations: z.array(z.string()).optional().describe('Recommendations for resolving any scheduling issues.'),
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
  prompt: `You are an AI assistant helping generate an optimal academic timetable for an Indian university adhering to NEP 2020 guidelines.

  Analyze the following data to create a conflict-free timetable. The output should be a structured JSON array of timetable entries.

  Data:
  - Course Requirements: {{{courseRequirements}}}
  - Faculty Availability: {{{facultyAvailability}}}
  - Room Capacities: {{{roomCapacities}}}
  - Student Data: {{{studentData}}}
  - Curriculum Structure: {{{curriculumStructure}}}
  - Teaching Practice Schedules: {{{teachingPracticeSchedules}}}
  - Field Work/Internships: {{{fieldWorkInternshipsAndProjectComponents}}}

  Constraints & Goals:
  1.  Adhere to NEP 2020: Accommodate Major, Minor, Skill-Based, Ability Enhancement, and Value-Added courses.
  2.  Avoid Conflicts: Prevent double-booking of rooms, faculty, or student groups.
  3.  Optimize Resources: Maximize the use of available rooms and faculty expertise.
  4.  Respect Workload: Adhere to faculty workload policies.
  5.  Structure Output: Return the timetable as a JSON array where each object contains 'day', 'time', 'course', 'room', 'faculty', and 'program'.

  If any unresolvable conflicts are detected, list them clearly in the 'conflicts' array and provide actionable recommendations in the 'recommendations' array. If there are no conflicts, return empty arrays for 'conflicts' and 'recommendations'.
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
    if (!output) {
      throw new Error('The AI model did not return a valid schedule. The response was empty.');
    }
    return output;
  }
);
