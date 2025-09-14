import { config } from 'dotenv';
config();

import '@/ai/flows/detect-and-explain-conflicts.ts';
import '@/ai/flows/suggest-optimal-schedule.ts';
import '@/ai/flows/generate-course-descriptions.ts';