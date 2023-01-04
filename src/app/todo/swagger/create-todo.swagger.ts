import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoSwagger {
    @ApiProperty()
    id: string;

    @ApiProperty()
    task: string;

    @ApiProperty()
    isDone: number;
}
