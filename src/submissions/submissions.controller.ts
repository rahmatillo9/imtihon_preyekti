import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { SubmissionsService } from './submissions.service';
  import { CreateSubmissionDto, UpdateSubmissionDto } from 'src/validators/submission.validator';
  import { Submission } from './submissions.model';
  
  @Controller('submissions')
  export class SubmissionsController {
    constructor(private readonly submissionsService: SubmissionsService) {}
  
    // Create a submission
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createSubmission(@Body() createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
      return this.submissionsService.createSubmission(createSubmissionDto);
    }
  
    // Get all submissions
    @Get()
    async findAll(): Promise<Submission[]> {
      return this.submissionsService.findAll();
    }
  
    // Get a submission by ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Submission> {
      return this.submissionsService.findOne(id);
    }
  
    // Update a submission by ID
    @Patch(':id')
    async update(
      @Param('id') id: number,
      @Body() updateSubmissionDto: UpdateSubmissionDto,
    ): Promise<Submission> {
      const [_, [updatedSubmission]] = await this.submissionsService.update(id, updateSubmissionDto);
      return updatedSubmission;
    }
  
    // Delete a submission by ID
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number): Promise<void> {
      return this.submissionsService.delete(id);
    }
  }
  