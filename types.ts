
export interface Project {
  id: string;
  title: string;
  role: string;
  company: string;
  period: string;
  description: string; // Short summary
  details: string[]; // Bullet points
  techStack: string[];
  logo?: string;
  link?: string;
  status?: string;
}

export interface ToolCategory {
  category: string;
  tools: {
    name: string;
    url: string;
    description?: string;
  }[];
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface TerminalLog {
  id: number;
  text: string;
  level: LogLevel;
}
