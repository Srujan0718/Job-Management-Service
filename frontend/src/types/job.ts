export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

export interface Job {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: JobType;
  minSalary: string;
  maxSalary: string;
  jobDescription: string;
  applicationDeadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobData {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: JobType;
  salaryRange: string;
  jobDescription: string;
  minSalary: string;
  maxSalary: string;
  applicationDeadline: string;
}

export interface JobFilters {
  jobTitle?: string;
  location?: string;
  jobType?: JobType;
  minSalary?: string;
  maxSalary?: string;
}