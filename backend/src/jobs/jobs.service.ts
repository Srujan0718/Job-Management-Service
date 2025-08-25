import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobDto } from './dto/filter-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create({
      ...createJobDto,
      applicationDeadline: new Date(createJobDto.applicationDeadline),
    });
    return await this.jobRepository.save(job);
  }

  async findAll(filters: FilterJobDto): Promise<Job[]> {

    // console.log(filters);
    const query = this.jobRepository.createQueryBuilder('job');

    if (filters.jobTitle) {
      query.andWhere('job.job_title ILIKE :jobTitle', {
        jobTitle: `%${filters.jobTitle}%`,
      });
    }

    if (filters.location) {
      query.andWhere('job.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    if (filters.jobType) {
      query.andWhere('job.job_type = :jobType', {
        jobType: filters.jobType,
      });
    }

    if (filters.minSalary) {
      query.andWhere('CAST(job.max_salary AS INTEGER) >= :minSalary', {
        minSalary: Number(filters.minSalary),
      });
    }

    if (filters.maxSalary) {
      query.andWhere('CAST(job.min_salary AS INTEGER) <= :maxSalary', {
        maxSalary: Number(filters.maxSalary),
      });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Job> {
    return await this.jobRepository.findOne({ where: { id } });
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const updateData: any = { ...updateJobDto };
    
    if (updateJobDto.applicationDeadline) {
      updateData.applicationDeadline = new Date(updateJobDto.applicationDeadline);
    }
    
    await this.jobRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}