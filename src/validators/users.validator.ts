import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export enum Role{
    Student = 'student',
    Teacher = 'teacher',
    Admin = 'admin',
}

export class CreateUsersDto{
    
    @IsString()
    @IsNotEmpty()
    FirstName: string;

    @IsString()
    @IsNotEmpty()
    LastName: string;
   
    @IsEnum(Role)
    @IsNotEmpty()
    role: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

}


export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    FirstName?: string;
  

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    LastName?: string;
  
    @IsOptional()
    @IsEnum(Role)  
    role?: string;

  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password?: string;

  }