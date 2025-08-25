// src/jobs/dto/filter-job.dto.ts
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { JobType } from '../entities/job.entity';

export class FilterJobDto {
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(JobType)
  jobType?: JobType;

  @IsOptional()
  @IsString()
  minSalary?: string;

  @IsOptional()
  @IsString()
  maxSalary?: string;
}