'use server';
/**
 * @fileOverview Detects scheduling conflicts and provides explanations.
 *
 * - detectAndExplainConflicts - Detects and explains conflicts in a timetable.
 * - DetectAndExplainConflictsInput - The input type for the detectAndExplainConflicts function.
 * - DetectAndExplainConflictsOutput - The return type for the detectAndExplainConflicts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAndExplainConflictsInputSchema = z.object({
  timetableData: z
    .string()
    .describe(
      'A string containing timetable data, including course schedules, faculty assignments, and room bookings.'
    ),
  facultyWorkloadPolicies: z
    .string()
    .describe('A string containing the faculty workload policies.'),
});
export type DetectAndExplainConflictsInput = z.infer<
  typeof DetectAndExplainConflictsInputSchema
>;

const DetectAndExplainConflictsOutputSchema = z.object({
  hasConflicts: z
    .boolean()
    .describe('Whether or not the timetable has conflicts.'),
  conflictExplanations: z
    .array(z.string())
    .describe('Explanations of each conflict detected.'),
  potentialResolutions: z
    .array(z.string())
    .describe('Potential resolutions for each conflict.'),
});
export type DetectAndExplainConflictsOutput = z.infer<
  typeof DetectAndExplainConflictsOutputSchema
>;

export async function detectAndExplainConflicts(
  input: DetectAndExplainConflictsInput
): Promise<DetectAndExplainConflictsOutput> {
  return detectAndExplainConflictsFlow(input);
}

const detectAndExplainConflictsPrompt = ai.definePrompt({
  name: 'detectAndExplainConflictsPrompt',
  input: {schema: DetectAndExplainConflictsInputSchema},
  output: {schema: DetectAndExplainConflictsOutputSchema},
  prompt: `You are an expert timetable validator. You are given timetable data and faculty workload policies.

  Timetable Data: {{{timetableData}}}
  Faculty Workload Policies: {{{facultyWorkloadPolicies}}}

  Detect any scheduling conflicts, such as double-booked rooms or faculty overload. Provide clear explanations of each issue and potential resolutions.
  Return whether there are any conflicts, explanations of each conflict, and potential resolutions for each conflict.
  If the timetable data has no conflicts then set hasConflicts to false and return empty arrays for conflictExplanations and potentialResolutions.
  `,
});

const detectAndExplainConflictsFlow = ai.defineFlow(
  {
    name: 'detectAndExplainConflictsFlow',
    inputSchema: DetectAndExplainConflictsInputSchema,
    outputSchema: DetectAndExplainConflictsOutputSchema,
  },
  async input => {
    const {output} = await detectAndExplainConflictsPrompt(input);
    return output!;
  }
);
