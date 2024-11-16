import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Enrollment } from './entrollment.model';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from 'src/validators/entrollment.entity';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.model';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment)
    private readonly enrollmentModel: typeof Enrollment,
  ) {}


  async createEnrollment(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    return this.enrollmentModel.create(createEnrollmentDto);
  }


  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentModel.findAll({
      include: [
      {
        model: User,
        as: 'user',
        attributes: ['FirstName', 'LastName'],
      },

      {
        model: Course,
        as: 'course',
        attributes: ['title', 'description', 'price', 'category']
      }


      ],
    });
  }

  
  async findOne(id: number): Promise<Enrollment> {
    return this.enrollmentModel.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['FirstName', 'LastName'],
        },
  
        {
          model: Course,
          as: 'course',
          attributes: ['title', 'description', 'price', 'category']
        }
  
  
        ],
    });
  }


  async getStudentCourses(userId: number){
    return await this.enrollmentModel.findOne({
      where: {user: {id: userId} },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['FirstName', 'LastName'],
        },
  
        {
          model: Course,
          as: 'course',
          attributes: ['title', 'description', 'price', 'category']
        }
  
  
        ],
    })
  }

  async update(
    id: number,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<[number, Enrollment[]]> {
    return this.enrollmentModel.update(updateEnrollmentDto, {
      where: { id },
      returning: true,
    });
  }


  async delete(id: number): Promise<void> {
    const enrollment = await this.enrollmentModel.findOne({ where: { id } });
    if (enrollment) {
      await enrollment.destroy();
    }
  }
}
