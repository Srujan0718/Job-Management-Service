// src/jobs/dto/update-job.dto.ts
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { JobType } from '../entities/job.entity';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

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

  @IsOptional()
  @IsString()
  jobDescription?: string;

  @IsOptional()
  @IsDateString()
  applicationDeadline?: string;
}