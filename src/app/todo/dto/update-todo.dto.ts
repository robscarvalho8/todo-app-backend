import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateTodoDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    task: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    @ApiPropertyOptional()
    isDone: number;
}
