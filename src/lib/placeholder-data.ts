import { Course, Faculty, Room } from './types';

export const mockCourses: Course[] = [
  { id: '1', name: 'Introduction to Psychology', code: 'PSY101', credits: 3, type: 'Major', semester: 1 },
  { id: '2', name: 'Calculus I', code: 'MATH101', credits: 4, type: 'Major', semester: 1 },
  { id: '3', name: 'Digital Marketing', code: 'MKT250', credits: 3, type: 'Skill-Based', semester: 2 },
  { id: '4', name: 'Environmental Science', code: 'ENV100', credits: 3, type: 'Ability Enhancement', semester: 1 },
  { id: '5', name: 'Indian Constitution', code: 'POL110', credits: 2, type: 'Value-Added', semester: 2 },
  { id: '6', name: 'Data Structures', code: 'CS201', credits: 4, type: 'Major', semester: 3 },
];

export const mockFaculty: Faculty[] = [
  { id: 'f1', name: 'Dr. Evelyn Reed', email: 'e.reed@example.com', department: 'Computer Science', workload: 12, expertise: ['Data Structures', 'Algorithms'] },
  { id: 'f2', name: 'Prof. Samuel Tan', email: 's.tan@example.com', department: 'Mathematics', workload: 10, expertise: ['Calculus', 'Linear Algebra'] },
  { id: 'f3', name: 'Dr. Aisha Khan', email: 'a.khan@example.com', department: 'Psychology', workload: 14, expertise: ['Cognitive Psychology', 'Clinical Psychology'] },
  { id: 'f4', name: 'Mr. Ben Carter', email: 'b.carter@example.com', department: 'Business', workload: 8, expertise: ['Marketing', 'Management'] },
];

export const mockRooms: Room[] = [
  { id: 'r1', name: 'Room 101', capacity: 60, type: 'Classroom', equipment: ['Projector', 'Whiteboard'] },
  { id: 'r2', name: 'Computer Lab 1', capacity: 30, type: 'Lab', equipment: ['Computers', 'Projector'] },
  { id: 'r3', name: 'Seminar Hall A', capacity: 120, type: 'Lecture Hall', equipment: ['Podium', 'Microphone', 'Projector'] },
  { id: 'r4', name: 'Room 203', capacity: 45, type: 'Classroom', equipment: ['Whiteboard'] },
];

export const facultyWorkloadData = [
  { name: 'Dr. Reed', workload: 12, max: 15 },
  { name: 'Prof. Tan', workload: 10, max: 15 },
  { name: 'Dr. Khan', workload: 14, max: 15 },
  { name: 'Mr. Carter', workload: 8, max: 15 },
  { name: 'Dr. Lee', workload: 11, max: 15 },
  { name: 'Prof. Garcia', workload: 9, max: 15 },
];

export const courseDistributionData = [
  { type: 'regular', count: 75, fill: 'var(--color-regular)' },
  { type: 'major', count: 45, fill: 'var(--color-major)' },
  { type: 'minor', count: 25, fill: 'var(--color-minor)' },
  { type: 'skill', count: 15, fill: 'var(--color-skill)' },
  { type: 'ability', count: 10, fill: 'var(--color-ability)' },
  { type: 'value', count: 5, fill: 'var(--color-value)' },
];
