// src/jobs/dto/create-job.dto.ts
import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { JobType } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(JobType)
  jobType: JobType;

  @IsString()
  @IsNotEmpty()
  minSalary: string;

  @IsString()
  @IsNotEmpty()
  maxSalary: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsDateString()
  applicationDeadline: string;
}
