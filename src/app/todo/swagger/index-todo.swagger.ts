import { ApiProperty } from '@nestjs/swagger';

export class ShowTodoSwagger {
    @ApiProperty()
    id: string;

    @ApiProperty()
    task: string;

    @ApiProperty()
    isDone: number;
}

export class IndexTodoSwagger {
    @ApiProperty()
    items: ShowTodoSwagger[];
}
