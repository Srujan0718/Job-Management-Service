// src/components/CreateJobModal.tsx
'use client';

import { Modal, Text, Button, Group, TextInput, Select, Textarea, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from 'react-hook-form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { CreateJobData, JobType } from '@/types/job';
import { jobsApi } from '@/services/api';

const jobTypeOptions = [
  { value: JobType.FULL_TIME, label: 'Full-time' },
  { value: JobType.PART_TIME, label: 'Part-time' },
  { value: JobType.CONTRACT, label: 'Contract' },
  { value: JobType.INTERNSHIP, label: 'Internship' },
];

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
  onJobCreated: () => void; // Callback to refresh jobs list
}

export function CreateJobModal({ opened, onClose, onJobCreated }: CreateJobModalProps) {
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<CreateJobData>();

  const onSubmit = async (data: CreateJobData) => {
    try {
      let deadline = "";
      if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
        deadline = selectedDate.toISOString().split("T")[0];
      }

      const jobData: CreateJobData = {
        ...data,
        jobType: selectedJobType as JobType,
        applicationDeadline: deadline,
      };

      // console.log(jobData, typeof jobData.applicationDeadline);

      await jobsApi.createJob(jobData);
      
      notifications.show({
        title: 'Success',
        message: 'Job created successfully',
        color: 'green',
      });
      
      // Reset form and close modal
      reset();
      setSelectedJobType('');
      setSelectedDate(null);
      onClose();
      onJobCreated(); // Refresh the jobs list
      
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to create job',
        color: 'red',
      });
    }
  };

  const handleJobTypeChange = (value: string | null) => {
    if (value) {
      setSelectedJobType(value);
      setValue('jobType', value as JobType);
    }
  };

  const handleDateChange = (date: string | Date | null) => {
    setSelectedDate(date ? new Date(date as any) : null);

    if (date) {
      if (typeof date === "string") {
        setValue("applicationDeadline", date);
      } else if (date instanceof Date) {
        setValue("applicationDeadline", date.toISOString().split("T")[0]);
      }
    }
  };

  const handleClose = () => {
    // Reset form when closing
    reset();
    setSelectedJobType('');
    setSelectedDate(null);
    onClose();
  };

  const handleSaveDraft = () => {
    notifications.show({
      title: 'Draft Saved',
      message: 'Your job posting has been saved as draft',
      color: 'blue',
    });
    handleClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Text size="xl" fw={600}>
          Create Job Opening
        </Text>
      }
      size="lg"
      centered
      padding="xl"
      radius="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          {/* First Row - Job Title and Company Name */}
          <Group grow>
            <TextInput
              label="Job Title"
              placeholder="Full Stack Developer"
              required
              error={errors.jobTitle?.message}
              {...register('jobTitle', { required: 'Job title is required' })}
            />
            <TextInput
              label="Company Name"
              placeholder="Amazon, Microsoft, Swiggy"
              required
              error={errors.companyName?.message}
              {...register('companyName', { required: 'Company name is required' })}
            />
          </Group>

          {/* Second Row - Location and Job Type */}
          <Group grow>
            <TextInput
              label="Location"
              placeholder="Choose Preferred Location"
              required
              error={errors.location?.message}
              {...register('location', { required: 'Location is required' })}
            />
            <Select
              label="Job Type"
              placeholder="Full Time"
              data={jobTypeOptions}
              required
              error={errors.jobType?.message}
              value={selectedJobType}
              onChange={handleJobTypeChange}
            />
          </Group>

          {/* Third Row - Salary Range and Application Deadline */}
          <Group grow>
            <Group grow>
              <TextInput
                label="Salary Range"
                placeholder="From"
                required
                error={errors.minSalary?.message}
                {...register('minSalary', { required: 'Minimum salary is required' })}
              />
              <TextInput
                placeholder="₹12,00,000"
                required
                error={errors.maxSalary?.message}
                {...register('maxSalary', { required: 'Maximum salary is required' })}
                style={{ marginTop: 25 }} // Align with the first input
              />
            </Group>
            <DatePickerInput
              label="Application Deadline"
              placeholder="Select deadline"
              required
              error={errors.applicationDeadline?.message}
              value={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
            />
          </Group>

          {/* Job Description */}
          <Textarea
            label="Job Description"
            placeholder="Please share a description to let the candidate know more about the job role"
            required
            minRows={4}
            error={errors.jobDescription?.message}
            {...register('jobDescription', { required: 'Job description is required' })}
          />

          {/* Action Buttons */}
          <Group justify="space-between" mt="lg">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              Save Draft ▼
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!selectedJobType || !selectedDate}
              style={{
                background: 'linear-gradient(45deg, #1890ff, #40a9ff)',
                border: 'none'
              }}
            >
              Publish ➤
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

// Export the hook for opening the modal
export function useCreateJobModal() {
  const [opened, setOpened] = useState(false);

  const openModal = () => {  
    setOpened(true)
  }
  const closeModal = () => setOpened(false);

  return {
    opened,
    openModal,
    closeModal,
  };
}