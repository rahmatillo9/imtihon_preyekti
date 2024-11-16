import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Submission } from './submissions.model';
import { Assignment } from 'src/assignments/assignments.model';
import { User } from 'src/users/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Submission, User, Assignment ])],
  providers: [SubmissionsService],
  controllers: [SubmissionsController]
})
export class SubmissionsModule {}
