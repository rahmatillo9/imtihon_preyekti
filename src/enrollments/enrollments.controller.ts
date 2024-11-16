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
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from 'src/validators/entrollment.entity';
import { Enrollment } from './entrollment.model';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  // Create an enrollment
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEnrollment(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<Enrollment> {
    return this.enrollmentsService.createEnrollment(createEnrollmentDto);
  }

  // Get all enrollments
  @Get()
  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentsService.findAll();
  }

  // Get an enrollment by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Enrollment> {
    return this.enrollmentsService.findOne(id);
  }

  // Update an enrollment
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    const [_, [updatedEnrollment]] = await this.enrollmentsService.update(
      id,
      updateEnrollmentDto,
    );
    return updatedEnrollment;
  }

  // Delete an enrollment
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.enrollmentsService.delete(id);
  }
}
