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
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from 'src/validators/assignments.entity';
import { Assignment } from './assignments.model';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Create an assignment
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAssignment(@Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentsService.createAssignment(createAssignmentDto);
  }

  // Get all assignments
  @Get()
  async findAll(): Promise<Assignment[]> {
    return this.assignmentsService.findAll();
  }

  // Get an assignment by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Assignment> {
    return this.assignmentsService.findOne(id);
  }

  // Update an assignment by ID
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const [_, [updatedAssignment]] = await this.assignmentsService.update(id, updateAssignmentDto);
    return updatedAssignment;
  }

  // Delete an assignment by ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.assignmentsService.delete(id);
  }
}
