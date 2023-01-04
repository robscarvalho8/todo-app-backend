import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoSwagger {
    @ApiProperty()
    id: string;

    @ApiProperty()
    task: string;

    @ApiProperty()
    isDone: number;
}
