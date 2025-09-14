'use server';

/**
 * @fileOverview An AI agent for generating course descriptions.
 *
 * - generateCourseDescriptions - A function that generates descriptions for a course.
 * - GenerateCourseDescriptionsInput - The input type for the generateCourseDescriptions function.
 * - GenerateCourseDescriptionsOutput - The return type for the generateCourseDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseDescriptionsInputSchema = z.object({
  courseName: z.string().describe('The name of the course.'),
  courseCode: z.string().describe('The code of the course.'),
  courseCredit: z.number().describe('The credit hours of the course.'),
  courseObjectives: z.string().describe('The objectives of the course.'),
});

export type GenerateCourseDescriptionsInput = z.infer<
  typeof GenerateCourseDescriptionsInputSchema
>;

const GenerateCourseDescriptionsOutputSchema = z.object({
  courseDescription: z.string().describe('The generated description of the course.'),
});

export type GenerateCourseDescriptionsOutput = z.infer<
  typeof GenerateCourseDescriptionsOutputSchema
>;

export async function generateCourseDescriptions(
  input: GenerateCourseDescriptionsInput
): Promise<GenerateCourseDescriptionsOutput> {
  return generateCourseDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseDescriptionsPrompt',
  input: {schema: GenerateCourseDescriptionsInputSchema},
  output: {schema: GenerateCourseDescriptionsOutputSchema},
  prompt: `You are an expert in generating course descriptions based on the course name, code, credit hours, and objectives.

  Course Name: {{{courseName}}}
  Course Code: {{{courseCode}}}
  Course Credit: {{{courseCredit}}}
  Course Objectives: {{{courseObjectives}}}

  Generate a detailed and engaging course description.
  `,
});

const generateCourseDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateCourseDescriptionsFlow',
    inputSchema: GenerateCourseDescriptionsInputSchema,
    outputSchema: GenerateCourseDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
