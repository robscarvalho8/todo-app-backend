import { ApiProperty } from '@nestjs/swagger';

export class NotFoundRequestSwagger {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;
}
