import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EnrollmentService } from './enrollments.service';
import { CreateEnrollmentDto } from 'src/validators/entrollment.entity';
import { UpdateEnrollmentDto } from 'src/validators/entrollment.entity';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get()
  async findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.enrollmentService.findOne(id);
  }

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.enrollmentService.delete(id);
  }
}
