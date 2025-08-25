"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, JobFilters } from '@/types/job';
import { jobsApi } from '@/services/api';

interface JobsContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  filters: JobFilters;
  setFilters: (filters: JobFilters) => void;
  fetchJobs: () => Promise<void>;
  clearFilters: () => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({});
  
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobsApi.getJobs(filters);
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };
  
   useEffect(() => {

    fetchJobs();
  }, [filters]);

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <JobsContext.Provider 
      value={{ 
        jobs, 
        loading, 
        error, 
        filters,
        setFilters,
        fetchJobs,
        clearFilters
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};