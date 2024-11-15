import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreatecourseDto } from 'src/validators/courses.validator';
import { UpdateCourseDto } from 'src/validators/courses.validator';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.courseService.findOne(id);
  }

  @Post()
  async create(@Body() createCourseDto: CreatecourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.courseService.delete(id);
  }
}
