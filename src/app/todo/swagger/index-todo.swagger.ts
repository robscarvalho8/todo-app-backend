import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class ShowTodoSwagger {
    @ApiProperty()
    id: string;

    @ApiProperty()
    task: string;

    @ApiProperty()
    isDone: number;
}

export class IndexTodoSwagger {
    @ApiProperty({ type: ShowTodoSwagger, isArray: true })
    items: ShowTodoSwagger[];
}
