import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Enrollment } from './entrollment.model';
import { CreateEnrollmentDto } from 'src/validators/entrollment.entity';
import { UpdateEnrollmentDto } from 'src/validators/entrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment)
    private readonly enrollmentModel: typeof Enrollment,
  ) {}

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentModel.findByPk(id, {
      include: { all: true },
    });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }
    return enrollment;
  }

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    return this.enrollmentModel.create({ ...createEnrollmentDto });
  }

  async update(
    id: number,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    const enrollment = await this.findOne(id);
    return enrollment.update({ ...updateEnrollmentDto });
  }

  async delete(id: number): Promise<void> {
    const enrollment = await this.findOne(id);
    await enrollment.destroy();
  }
}
