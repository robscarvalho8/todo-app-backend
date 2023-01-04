import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class UpdateTodoDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    task: string;

    @IsInt()
    @Min(0)
    @Max(1)
    @ApiPropertyOptional()
    isDone: number;
}
