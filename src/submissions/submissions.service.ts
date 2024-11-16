import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Submission } from './submissions.model';
import { CreateSubmissionDto, UpdateSubmissionDto } from 'src/validators/submission.validator';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission)
    private readonly submissionModel: typeof Submission,
  ) {}

  // Create a submission
  async createSubmission(createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    return this.submissionModel.create(createSubmissionDto);
  }

  // Get all submissions
  async findAll(): Promise<Submission[]> {
    return this.submissionModel.findAll();
  }

  // Get a submission by ID
  async findOne(id: number): Promise<Submission> {
    return this.submissionModel.findOne({
      where: { id },
    });
  }

  // Update a submission
  async update(
    id: number,
    updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<[number, Submission[]]> {
    return this.submissionModel.update(updateSubmissionDto, {
      where: { id },
      returning: true,
    });
  }

  // Delete a submission
  async delete(id: number): Promise<void> {
    const submission = await this.submissionModel.findOne({ where: { id } });
    if (submission) {
      await submission.destroy();
    }
  }
}
