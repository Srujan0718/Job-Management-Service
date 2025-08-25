import { Job, CreateJobData, JobFilters } from '@/types/job';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const jobsApi = {
  async getJobs(filters?: JobFilters): Promise<Job[]> {
    const searchParams = new URLSearchParams();
    
    if (filters?.jobTitle) searchParams.append('jobTitle', filters.jobTitle);
    if (filters?.location) searchParams.append('location', filters.location);
    if (filters?.jobType) searchParams.append('jobType', filters.jobType);
    if (filters?.minSalary) searchParams.append('minSalary', filters.minSalary);
    if (filters?.maxSalary) searchParams.append('maxSalary', filters.maxSalary);

    // console.log(`${API_BASE_URL}/jobs${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);

    const response = await fetch(
      `${API_BASE_URL}/jobs${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    
    return response.json();
  },

  async createJob(jobData: CreateJobData): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    
    return response.json();
  },

  async deleteJob(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete job');
    }
  },
};
