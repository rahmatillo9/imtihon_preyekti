import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Course } from 'src/courses/courses.model';
import { User } from 'src/users/users.entity';

@Table({
  tableName: 'assignments2',
  timestamps: true,
})
export class Assignment extends Model<Assignment> {
  
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  assignmentId: number;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @ForeignKey(() => User)  
  @Column({
    type: DataType.INTEGER,
    allowNull: true,  
  })
  userId: number;  

  @BelongsTo(() => User) 
  user: User;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dueDate: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
}
