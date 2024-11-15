import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { CreatecourseDto } from 'src/validators/courses.validator';
import { UpdateCourseDto } from 'src/validators/courses.validator';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseModel.findByPk(id, { include: { all: true } });
    if (!course) {
      throw new NotFoundException('Course topilmadi');
    }
    return course;
  }

  async create(createCourseDto: CreatecourseDto): Promise<Course> {
    return this.courseModel.create({ ...createCourseDto });
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const course = await this.findOne(id);
    return course.update({ ...updateCourseDto });
  }

  async delete(id: number): Promise<void> {
    const course = await this.findOne(id);
    await course.destroy();
  }
}
