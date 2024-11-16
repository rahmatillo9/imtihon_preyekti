import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './courses.model';
import { CreatecourseDto, UpdateCourseDto } from 'src/validators/courses.validator';
import { User } from 'src/users/users.entity';
import { Lesson } from 'src/lessons/lessons.model';


@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
  ) {}


  async createCourse(createCourseDto: CreatecourseDto): Promise<Course> {
    return this.courseModel.create(createCourseDto);
  }


  async findAll(): Promise<Course[]> {
    return this.courseModel.findAll({
      include: [
        {
          model: User,
          as: 'teacher', 
          attributes: ['FirstName', 'Lastname'], 
        },
        {
          model: Lesson,
          as: 'lessons', 
          attributes: ['description', 'startTime', 'endTime'], 
        },
      ],
    });
  }


  async findOne(id: number): Promise<Course> {
    return this.courseModel.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'teacher', 
          attributes: ['FirstName', 'Lastname'], 
        },
        {
          model: Lesson,
          as: 'lessons', 
          attributes: ['description', 'startTime', 'endTime'], 
        },
      ],
    });
  }


  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<[number, Course[]]> {
    return this.courseModel.update(updateCourseDto, {
      where: { id },
      returning: true,
    });
  }

  async findByCategory(category: string): Promise<Course[]> {
    try {
      const courses = await this.courseModel.findAll({
        where: { category },
        include: [
          {
            model: User,
            as: 'teacher', 
            attributes: ['FirstName', 'Lastname'], 
          },
          {
            model: Lesson,
            as: 'lessons', 
            attributes: ['description', 'startTime', 'endTime'], 
          },
        ],
      });
  

      if (!courses.length) {
        console.log(`No courses found in category: ${category}`);
        return [];
      }
  
      return courses;
    } catch (error) {
      console.error('Error fetching courses by category:', error.message);
      throw new Error('Could not fetch courses. Please try again later.');
    }
  }
  


  async delete(id: number): Promise<void> {
    const course = await this.courseModel.findOne({
      where: { id },
    });
    if (course) {
      await course.destroy();
    }
  }
}
