import { Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import { Assignment } from "src/assignments/assignments.model";
import { Course } from "src/courses/courses.model";
import { Lesson } from "src/lessons/lessons.model";


@Table({
  tableName: 'users4',
  timestamps: true
})
export class User extends Model<User> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  FirstName!: string;



  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  LastName!: string;


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



  @HasMany(() => Lesson)  
  lessons: Lesson[];
  
  @HasMany(() => Assignment)
  assignment: Assignment[];

  @HasMany(() => Course)
  course: Course[];

}