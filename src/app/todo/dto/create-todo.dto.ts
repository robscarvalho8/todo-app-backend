import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateTodoDTO {
    @IsNotEmpty()
    @IsString()
    task: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    isDone: number;
}
