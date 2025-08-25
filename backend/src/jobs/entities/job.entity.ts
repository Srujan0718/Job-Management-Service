import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ name: 'job_title' })
  jobTitle: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: JobType,
    name: 'job_type'
  })
  jobType: JobType;

  @Column({ name: 'min_salary' })
  minSalary: string;

  @Column({ name: 'max_salary' })
  maxSalary: string;

  @Column({ name: 'job_description', type: 'text' })
  jobDescription: string;

  @Column({ name: 'application_deadline', type: 'date' })
  applicationDeadline: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}