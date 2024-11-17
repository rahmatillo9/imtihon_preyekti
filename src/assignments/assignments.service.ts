import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './assignments.model';
import { CreateAssignmentDto, UpdateAssignmentDto } from 'src/validators/assignments.entity';
import { Course } from 'src/courses/courses.model';
import { User } from 'src/users/users.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private readonly assignmentModel: typeof Assignment,
  ) {}


  async createAssignment(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentModel.create(createAssignmentDto);
  }


  async findAll(): Promise<Assignment[]> {
    return this.assignmentModel.findAll({
      include: [
        {
          model: Course,
          as: 'course', 
          attributes: ['title', 'category'], 
        },
      ],
    });
  }
  

 
  async findOne(id: number): Promise<Assignment> {
    return this.assignmentModel.findOne({
      where: { assignmentId: id },
      include: [
        {
          model: Course,
          as: 'course', 
          attributes: ['title', 'category'],
        },
      ],
    });
  }
  

  async findAssignmentsByCourse(courseId: number): Promise<Assignment[]> {
    return this.assignmentModel.findAll({
      where: { courseId },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['title', 'category'],
        },
      ],
    });
  }
  
  
  async setAssignmentDeadline(assignmentId: number, dueDate: Date): Promise<Assignment> {
    const assignment = await this.assignmentModel.findByPk(assignmentId);
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${assignmentId} not found`);
    }

    assignment.dueDate = dueDate;
    return assignment.save();
  }

  async update(
    id: number,
    updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<[number, Assignment[]]> {
    return this.assignmentModel.update(updateAssignmentDto, {
      where: { assignmentId: id },
      returning: true,
    });
  }

  async findAllWithTeacher(): Promise<Assignment[]> {
    return this.assignmentModel.findAll({
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['title', 'category'],
          include: [
            {
              model: User,
              as: 'teacher',
              attributes: ['FirstName', 'LastName'],
            },
          ],
        },
      ],
    });
  }
  

  async delete(id: number): Promise<void> {
    const assignment = await this.assignmentModel.findOne({
      where: { assignmentId: id },
    });
    if (assignment) {
      await assignment.destroy();
    }
  }
}
