import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { Enrollment } from './entrollment.model';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.model';

@Module({
  imports: [SequelizeModule.forFeature([Enrollment, User, Course])],
  providers: [EnrollmentsService],
  controllers: [EnrollmentsController],
})
export class EnrollmentsModule {}
