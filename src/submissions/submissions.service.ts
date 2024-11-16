import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Submission } from './submissions.model';
import { CreateSubmissionDto, UpdateSubmissionDto } from 'src/validators/submission.validator';
import { Assignment } from 'src/assignments/assignments.model';
import { User } from 'src/users/users.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission)
    private readonly submissionModel: typeof Submission,
  ) {}


  async createSubmission(createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    return this.submissionModel.create(createSubmissionDto);
  }


  async findAll(): Promise<Submission[]> {
    return this.submissionModel.findAll({
      include: [
        {
          model: Assignment,
          as: 'assignment',  
          attributes: ['title', 'description', 'dueDate'], 
        },
        {
          model: User,
          as: 'user', 
          attributes: ['FirstName', 'LastName', 'email'], 
        },
      ],

    });
  }


  async findOne(id: number): Promise<Submission> {
    return this.submissionModel.findOne({
      where: { id },
      include: [
        {
          model: Assignment,
          as: 'assignment',  
          attributes: ['title', 'description', 'dueDate'], 
        },
        {
          model: User,
          as: 'user', 
          attributes: ['FirstName', 'LastName', 'email'], 
        },
      ],

    });
  }


  async update(
    id: number,
    updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<[number, Submission[]]> {
    return this.submissionModel.update(updateSubmissionDto, {
      where: { id },
      returning: true,
    });
  }


  async delete(id: number): Promise<void> {
    const submission = await this.submissionModel.findOne({ where: { id } });
    if (submission) {
      await submission.destroy();
    }
  }
}
