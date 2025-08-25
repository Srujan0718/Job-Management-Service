// src/app/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container, Title, Grid, Paper, Button, Group, Text, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { JobCard } from '@/components/JobCard';

import "./dashboard.css"
import Navbar from '@/components/NavBar';
import { useJobs } from './JobsContextProvider';

export default function HomePage() {
  const { jobs, fetchJobs } = useJobs();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchJobs();
    setLoading(false);
  }, []);

  return (
    <Container px='0' my='0' size="xxl" style={{backgroundColor: "#faf7ff", height: "100vh", overflow: "auto"}}>
    <Navbar/>
    <Container size="xl">

      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        
        {jobs.length === 0 && !loading ? (
          <Paper p="xl" style={{ textAlign: 'center' }}>
            <Text size="lg" c="dimmed">
              No jobs found
            </Text>
          </Paper>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: "15px",
            margin: 0
          }}>
            {jobs.map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>

        )}
      </div>
    </Container>
    </Container>

  );
}
