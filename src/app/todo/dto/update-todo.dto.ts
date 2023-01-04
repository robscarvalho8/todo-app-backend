import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class UpdateTodoDTO {
    @IsNotEmpty()
    @IsString()
    task: string;

    @IsInt()
    @Min(0)
    @Max(1)
    isDone: number;
}
