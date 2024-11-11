import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.entity';
import { Assignment } from './assignments.entity';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
@Module({
  imports: [SequelizeModule.forFeature([Assignment, User, Course])],
  providers: [AssignmentsController],
  controllers: [AssignmentsService],
})
export class AssignmentsModule {}
