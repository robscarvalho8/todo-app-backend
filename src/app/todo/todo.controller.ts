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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { NotFoundRequestSwagger } from '../helpers/swagger/not-found-request.swagger';
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
    })
    async index() {
        const tasks = await this.todoService.findAll();
        const index_tasks: IndexTodoSwagger = { items: tasks };
        return index_tasks;
    }

    @Post()
    @ApiOperation({ summary: 'Add a new task' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'New task created success', type: CreateTodoSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid params', type: BadRequestSwagger })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found', type: NotFoundRequestSwagger })
    async create(@Body() body: CreateTodoDTO) {
        return await this.todoService.create(body);
    }

    // GET http://localhost:3000/api/v1/todos/uuid
    @Get(':id')
    @ApiOperation({ summary: 'View one task data' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Data task return success', type: ShowTodoSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid params', type: BadRequestSwagger })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found', type: NotFoundRequestSwagger })
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        const task: UpdateTodoSwagger = await this.todoService.findOne(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
        return task;
    }

    // PUT http://localhost:3000/api/v1/todos/uuid
    @Put(':id')
    @ApiOperation({ summary: 'Update one task data' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Data task updated success', type: UpdateTodoSwagger })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid params', type: BadRequestSwagger })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found', type: NotFoundRequestSwagger })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDTO) {
        return await this.todoService.update(id, body).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete one task' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Task deleted success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid params', type: BadRequestSwagger })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found', type: NotFoundRequestSwagger })
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.todoService.delete(id).catch((e) => {
            throw new NotFoundException(e.message);
        });
    }
}
