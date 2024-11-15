import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './assignments.model';
import { CreateAssignmentDto } from 'src/validators/assignments.entity';
import { UpdateAssignmentDto } from 'src/validators/assignments.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private readonly assignmentModel: typeof Assignment,
  ) {}

  async findAll(): Promise<Assignment[]> {
    return this.assignmentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentModel.findByPk(id, {
      include: { all: true },
    });
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }
    return assignment;
  }

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentModel.create({ ...createAssignmentDto });
  }

  async update(
    id: number,
    updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const assignment = await this.findOne(id);
    return assignment.update({ ...updateAssignmentDto });
  }

  async delete(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    await assignment.destroy();
  }
}
