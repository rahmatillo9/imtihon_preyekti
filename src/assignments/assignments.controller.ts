import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from 'src/validators/assignments.entity';
import { UpdateAssignmentDto } from 'src/validators/assignments.entity';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  async findAll() {
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.assignmentsService.findOne(id);
  }

  @Post()
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.assignmentsService.delete(id);
  }
}


