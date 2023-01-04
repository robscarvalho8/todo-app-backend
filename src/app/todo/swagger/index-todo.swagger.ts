import { ApiProperty } from '@nestjs/swagger';

export class IndexTodoSwagger {
    @ApiProperty()
    id: string;

    @ApiProperty()
    task: string;

    @ApiProperty()
    isDone: number;
}
