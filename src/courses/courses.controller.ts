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
import { CoursesService } from './courses.service';
import { CreatecourseDto, UpdateCourseDto } from 'src/validators/courses.validator';
import { Course } from './courses.model';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCourse(@Body() createCourseDto: CreatecourseDto): Promise<Course> {
    return this.coursesService.createCourse(createCourseDto);
  }




  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }
  
  @Get('/category/:category')
  async getBycategory(@Param('category') category: string):Promise<Course[]>{
    return this.coursesService.findByCategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Course> {
    return this.coursesService.findOne(id);
  }


  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const [_, [updatedCourse]] = await this.coursesService.update(id, updateCourseDto);
    return updatedCourse;
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    return this.coursesService.delete(id);
  }
}
