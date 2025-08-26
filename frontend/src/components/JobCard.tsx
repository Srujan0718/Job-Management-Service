'use client';

import { Card, Text, Badge, Group, Button, Stack, Avatar } from '@mantine/core';
import { Job } from '@/types/job';
import {IconBuilding, IconUsers, IconCurrencyDollar } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

interface JobCardProps {
  job: Job;
}

const getAvatarColor = (initial: string) => {
  const colors = {
    a: '#FF6B6B',
    b: '#4ECDC4',
    c: '#45B7D1',
    d: '#96CEB4',
    e: '#FFEEAD',
    f: '#D4A5A5',
    g: '#9B59B6',
    h: '#3498DB',
    i: '#E74C3C',
    j: '#2ECC71',
    k: '#F1C40F',
    l: '#1ABC9C',
    m: '#E67E22',
    n: '#DB4437',
    o: '#7F8C8D',
    p: '#16A085',
    q: '#8E44AD',
    r: '#2980B9',
    s: '#C0392B',
    t: '#27AE60',
    u: '#F39C12',
    v: '#D35400',
    w: '#BDC3C7',
    x: '#34495E',
    y: '#95A5A6',
    z: '#E74C3C'
  };
  return colors[initial.toLowerCase()] || '#2d3748';
};

export function JobCard({ job }: JobCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return dateString;
    const now = new Date();
    const jobDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - jobDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1d Ago';
    if (diffDays < 7) return `${diffDays}d Ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w Ago`;
    return `${Math.ceil(diffDays / 30)}m Ago`;
  };

  const getCompanyInitial = (companyName: string) => {
    return companyName.charAt(0).toLowerCase();
  };

  const getExperienceText = () => {
    // This would ideally come from job data, using placeholder for now
    return "1-3 yr Exp";
  };

  const getLocationText = () => {
    return job.location === 'Remote' ? 'Remote' : 'Onsite';
  };

  const getSalaryText = () => {
    if (job.minSalary && job.maxSalary) {
      return `${job.minSalary}`;
    }
    return job.minSalary || job.maxSalary || '12LPA';
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      style={{ 
        maxWidth: 350, 
        height: "100%", 
        display: "flex", 
        flexDirection: "column" 
      }}
    >
      {/* Content area that grows to fill space */}
      <div style={{ flex: 1 }}>
        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <Group gap="sm">
              <Avatar
                size={50}
                radius="50%"
                color='white'
                style={{ 
                  backgroundColor: getAvatarColor(getCompanyInitial(job.companyName)), 
                }}
              >
                {getCompanyInitial(job.companyName).toUpperCase()}
              </Avatar>
              <Text size="sm" fw={500}>
                {job.companyName}
              </Text>
            </Group>
            <Badge color="blue" variant="light" size="sm" radius="md">
              {formatDate(job.applicationDeadline)}
            </Badge>
          </Group>

          <Stack gap="xs">
            <Text fw={600} size="lg" style={{ lineHeight: 1.2 }}>
              {job.jobTitle}
            </Text>
            
            <Group gap="sm">
              <Group gap="xs">
                <IconUsers size={16} color="#666" />
                <Text size="sm" c="dimmed">
                  {getExperienceText()}
                </Text>
              </Group>
              <Group gap="xs">
                <IconBuilding size={16} color="#666" />
                <Text size="sm" c="dimmed">
                  {getLocationText()}
                </Text>
              </Group>
              <Group gap="xs">
                <IconCurrencyDollar size={16} color="#666" />
                <Text size="sm" c="dimmed">
                  {getSalaryText()}
                </Text>
              </Group>
            </Group>
          </Stack>

          <Stack gap="xs">
            {job.jobDescription.split('\n').slice(0, 2).map((point, index) => (
              <Group gap="xs" key={index} align="flex-start" style={{flexWrap: "nowrap"}}>
                <Text size="sm" style={{ marginTop: 2 }}>•</Text>
                <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
                  {point.trim()}
                </Text>
              </Group>
            ))}
          </Stack>
        </Stack>
      </div>

      {/* Button positioned at bottom */}
      <Button
        fullWidth
        size="md"
        radius="md"
        style={{
          background: 'linear-gradient(45deg, #1890ff, #40a9ff)',
          border: 'none',
          marginTop: 16
        }}
        onClick={() => {}}
      >
        Apply Now
      </Button>
      
      {/* <Button
        variant="subtle"
        color="red"
        size="xs"
        leftSection={<IconTrash size={14} />}
        onClick={() => onDelete(job.id)}
        style={{ alignSelf: 'flex-end', marginTop: 8 }}
      >
        Delete
      </Button> */}
    </Card>
  );
}