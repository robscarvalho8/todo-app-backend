import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateTodoDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({})
    task: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    @ApiProperty()
    isDone: number;
}
