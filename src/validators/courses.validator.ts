import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatecourseDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description:string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsNotEmpty()
    category: string
    

}




export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Title should not be empty' })
    title?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Description should not be empty' })
    description?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Price must be a valid number' })
    @IsNotEmpty({ message: 'Price should not be empty' })
    price?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Category should not be empty' })
    category?: string;
}