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
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { IndexTodoSwagger, ShowTodoSwagger } from './swagger/index-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    @ApiOperation({ summary: 'List all tasks' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'List of tasks returned success',
        type: IndexTodoSwagger,
        isArray: true,
    })
    async index() {
        return await this.todoService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Add a new task' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'New task created success', type: CreateTodoSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid params' })
    async create(@Body() body: CreateTodoDTO) {
        return await this.todoService.create(body);
    }

    // GET http://localhost:3000/api/v1/todos/uuid
    @Get(':id')
    @ApiOperation({ summary: 'View one task data' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Data task return success', type: ShowTodoSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid params' })
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOne(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    // PUT http://localhost:3000/api/v1/todos/uuid
    @Put(':id')
    @ApiOperation({ summary: 'Update one task data' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Data task updated success', type: UpdateTodoSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid params' })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDTO) {
        return await this.todoService.update(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete one task' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Task deleted success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid params' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.todoService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
