import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { Course } from "src/courses/courses.entity";
import { Enrollment } from "src/enrollments/entrollmen.entity";

@Table({
  tableName: 'users4',
  timestamps: true
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Lastname!: string;

  @Column({
    type: DataType.ENUM('student', 'teacher', 'admin'),
    allowNull: false,
  })
  role!: string;
   
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;


  @HasMany(() => Course)
  courses: Course[];


  @HasMany(() => Enrollment)
  enrollments: Enrollment[];
}
