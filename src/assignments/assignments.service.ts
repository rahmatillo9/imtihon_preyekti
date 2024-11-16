import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './assignments.model';
import { CreateAssignmentDto, UpdateAssignmentDto } from 'src/validators/assignments.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private readonly assignmentModel: typeof Assignment,
  ) {}

  // Create an assignment
  async createAssignment(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentModel.create(createAssignmentDto);
  }

  // Get all assignments
  async findAll(): Promise<Assignment[]> {
    return this.assignmentModel.findAll();
  }

  // Get an assignment by ID
  async findOne(id: number): Promise<Assignment> {
    return this.assignmentModel.findOne({
      where: { assignmentId: id },
    });
  }

  // Update an assignment
  async update(
    id: number,
    updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<[number, Assignment[]]> {
    return this.assignmentModel.update(updateAssignmentDto, {
      where: { assignmentId: id },
      returning: true,
    });
  }

  // Delete an assignment
  async delete(id: number): Promise<void> {
    const assignment = await this.assignmentModel.findOne({
      where: { assignmentId: id },
    });
    if (assignment) {
      await assignment.destroy();
    }
  }
}
