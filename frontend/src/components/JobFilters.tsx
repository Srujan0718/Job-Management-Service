"use client";
import { useState, useEffect} from 'react';
import { TextInput, Select, Flex, Text, RangeSlider } from '@mantine/core';
import { IconSearch, IconMapPin, IconUsers } from '@tabler/icons-react';
import { JobFilters, JobType } from '@/types/job';
import { useDebouncedValue } from '@mantine/hooks';
import { useJobs } from '@/app/JobsContextProvider';

export function JobFiltersWithHandlers() {
  const { filters, setFilters, clearFilters} = useJobs();

  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [salaryRange, setSalaryRange] = useState<[number, number]>([10, 200]);

  const [debouncedSearch] = useDebouncedValue(searchQuery, 500);
  const [debouncedLocation] = useDebouncedValue(locationQuery, 500);

  const jobTypeOptions = [
    { value: JobType.FULL_TIME, label: 'Full-time' },
    { value: JobType.PART_TIME, label: 'Part-time' },
    { value: JobType.CONTRACT, label: 'Contract' },
    { value: JobType.INTERNSHIP, label: 'Internship' },
  ];
  
  const applyFilters = () => {
    const filters: JobFilters = {};
    
    if (debouncedSearch.trim()) filters.jobTitle = debouncedSearch.trim();
    if (debouncedLocation.trim()) filters.location = debouncedLocation.trim();
    if (selectedJobType) filters.jobType = selectedJobType as JobType;
    filters.minSalary = `${salaryRange[0]}000`;
    filters.maxSalary = `${salaryRange[1]}000`;

    setFilters(filters);
  };

  useEffect(() => {
    applyFilters();
  }, [debouncedSearch, debouncedLocation, selectedJobType, salaryRange[0], salaryRange[1]]);


  const handleClearFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedJobType('');
    setSalaryRange([10, 200]);
    clearFilters();
  };

  // Individual handler functions
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationQuery(event.currentTarget.value);
  };

  const handleJobTypeChange = (value: string | null) => {
    setSelectedJobType(value || '');
  };

  const handleSalaryRangeChange = (value: [number, number]) => {
    setSalaryRange(value);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      gap="md"
      mt="lg"
      p="md"
    >
      {/* Search Bar */}
      <TextInput
        classNames={{
          root: 'custom-root',
          input: 'custom-input',
          label: 'custom-label',
        }}
        placeholder="Search By Job Title, Role"
        leftSection={<IconSearch size={16} />}
        radius="md"
        style={{ flex: 1 }}
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Location Select */}
      <TextInput
        classNames={{
          root: 'custom-root',
          input: 'custom-input',
          label: 'custom-label',
        }}
        placeholder="Preferred Location"
        leftSection={<IconMapPin size={16} />}
        radius="md"
        style={{ flex: 1 }}
        value={locationQuery}
        onChange={handleLocationChange}
      />

      {/* Job Type Select */}
      <Select
        classNames={{
          root: 'custom-root',
          input: 'custom-input',
          label: 'custom-label',
        }}
        placeholder="Job type"
        leftSection={<IconUsers size={16} />}
        data={jobTypeOptions}
        radius="md"
        style={{ flex: 1 }}
        value={selectedJobType}
        onChange={handleJobTypeChange}
        clearable
      />

      {/* Salary Range */}
      <div
        style={{
          flex: 1,
          padding: '16px 20px',
          backgroundColor: '#ffffff',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
        }}
        className="salary-range"
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <Text style={{
            fontSize: '16px',
            fontWeight: 500,
            color: '#495057',
          }}>
            Salary Per Month
          </Text>
          <Text style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#212529',
          }}>
            ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
          </Text>
        </div>

        <div style={{ padding: '8px 0' }}>
          <RangeSlider
            min={10}
            max={200}
            step={10}
            value={salaryRange}
            onChange={handleSalaryRangeChange}
            size="md"
            color="#495057"
            styles={{
              track: {
                backgroundColor: '#e9ecef',
                height: 4,
                borderRadius: 2,
              },
              bar: {
                backgroundColor: '#495057',
                height: 4,
              },
              thumb: {
                width: 20,
                height: 20,
                backgroundColor: '#495057',
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              },
              label: {
                display: 'none',
              }
            }}
          />
        </div>
      </div>

      {(searchQuery || locationQuery || selectedJobType || salaryRange[0] !== 10 || salaryRange[1] !== 200) && (
        <button
          onClick={handleClearFilters}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            color: '#6c757d',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Clear Filters
        </button>
      )}
    </Flex>
  );
}