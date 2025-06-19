export interface EngineerProfileProps {
  id: string;
  name: string;
  username: string;
  title: string;
  yearsOfExperience: number;
  language: string;
  hoursPerWeek: number;
  hourlyRate: string | number;
}

export interface JobHistory {
  company: string;
  position: string;
  duration: string;
  client?: string;
}

export interface AcademicBg {
  name: string;
  school: string;
  major: string;
  duration: string;
}

export interface Skill {
  name: string;
  level: number; // 1〜5のレベルを想定
}

export interface RecommendedTechnology {
  name: string;
  description: string;
}

