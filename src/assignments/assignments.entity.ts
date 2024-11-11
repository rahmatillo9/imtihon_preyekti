import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { Course } from 'src/courses/courses.entity';

@Table({
  tableName: 'assignments',
  timestamps: true,
})
export class Assignment extends Model<Assignment> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dueDate: Date;

  // Kurs bilan bog'lanish
  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  // O‘qituvchi bilan bog'lanish
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  teacherId: number;

  @BelongsTo(() => User)
  teacher: User;
}
