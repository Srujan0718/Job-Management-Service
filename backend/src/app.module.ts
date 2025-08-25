import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
      type: 'postgres',
      host: config.get<string>('DATABASE_HOST'), // e.g. db.xxxxx.supabase.co
      port: 5432,
      username: config.get<string>('DATABASE_USERNAME'), // usually 'postgres'
      password: config.get<string>('DATABASE_PASSWORD'), // the DB password, not service key
      database: config.get<string>('DATABASE_NAME'), // usually 'postgres'
      entities: [Job],
      schema: 'public',
      ssl: true,
      extra: {
        ssl: { rejectUnauthorized: false },
      },
      synchronize: false,
    }),
    }),
    JobsModule,
  ],
})
export class AppModule {}