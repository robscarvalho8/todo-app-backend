import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async index() {
        return await this.todoService.findAll();
    }

    @Post()
    async create(@Body() body) {
        return await this.todoService.create(body);
    }

    // GET http://localhost:3000/api/v1/todos/uuid
    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOne(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    // PUT http://localhost:3000/api/v1/todos/uuid
    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body) {
        return await this.todoService.update(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.todoService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
