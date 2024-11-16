import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { CreatecourseDto, UpdateCourseDto } from 'src/validators/courses.validator';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
  ) {}

  // Create a course
  async createCourse(createCourseDto: CreatecourseDto): Promise<Course> {
    return this.courseModel.create(createCourseDto);
  }

  // Get all courses
  async findAll(): Promise<Course[]> {
    return this.courseModel.findAll({
      include: ['teacher', 'lessons', 'enrollments'],
    });
  }

  // Get a course by ID
  async findOne(id: number): Promise<Course> {
    return this.courseModel.findOne({
      where: { id },
      include: ['teacher', 'lessons', 'enrollments'],
    });
  }

  // Update a course
  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<[number, Course[]]> {
    return this.courseModel.update(updateCourseDto, {
      where: { id },
      returning: true,
    });
  }

  // Delete a course
  async delete(id: number): Promise<void> {
    const course = await this.courseModel.findOne({
      where: { id },
    });
    if (course) {
      await course.destroy();
    }
  }
}
