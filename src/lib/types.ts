export type Course = {
  id: string;
  name: string;
  code: string;
  credits: number;
  type: 'Major' | 'Minor' | 'Skill-Based' | 'Ability Enhancement' | 'Value-Added';
  semester: number;
};

export type Faculty = {
  id: string;
  name: string;
  email: string;
  department: string;
  workload: number;
  expertise: string[];
};
