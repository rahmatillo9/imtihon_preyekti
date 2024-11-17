import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Assignment } from 'src/assignments/assignments.model';
import { User } from '../users/users.entity';

@Table({ tableName: 'submissions', timestamps: true })
export class Submission extends Model<Submission> {
  @ForeignKey(() => Assignment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  assignmentId: number;

  @BelongsTo(() => Assignment)
  assignment: Assignment;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  submissionLink: string; 

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  submittedAt: Date; 

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  grade: number; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  feedback: string; 

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isSubmitted: boolean;

}
