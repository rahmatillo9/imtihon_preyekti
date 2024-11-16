import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Enrollment } from './entrollment.model';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from 'src/validators/entrollment.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment)
    private readonly enrollmentModel: typeof Enrollment,
  ) {}

  // Create an enrollment
  async createEnrollment(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    return this.enrollmentModel.create(createEnrollmentDto);
  }

  // Get all enrollments
  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentModel.findAll({
      include: ['user', 'course'],
    });
  }

  // Get an enrollment by ID
  async findOne(id: number): Promise<Enrollment> {
    return this.enrollmentModel.findOne({
      where: { id },
      include: ['user', 'course'],
    });
  }

  // Update an enrollment
  async update(
    id: number,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<[number, Enrollment[]]> {
    return this.enrollmentModel.update(updateEnrollmentDto, {
      where: { id },
      returning: true,
    });
  }

  // Delete an enrollment
  async delete(id: number): Promise<void> {
    const enrollment = await this.enrollmentModel.findOne({ where: { id } });
    if (enrollment) {
      await enrollment.destroy();
    }
  }
}
