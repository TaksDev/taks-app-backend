import { IsString, IsNotEmpty, MinLength, IsBoolean } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @IsString()
  description?: string;
  @IsBoolean()
  done?: boolean;
}
