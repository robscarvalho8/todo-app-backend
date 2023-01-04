import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) {}

    async findAll() {
        return await this.todoRepository.find();
    }

    async findOne(id: string) {
        const todo = await this.todoRepository.findOne({ where: { id: id } }).catch();
        if (!todo) {
            throw Error(`Task with id '${id}' not found`);
        }
        return todo;
    }

    async create(data: CreateTodoDTO) {
        return await this.todoRepository.save(this.todoRepository.create(data));
    }

    async update(id: string, data: UpdateTodoDTO) {
        const todo = await this.findOne(id);
        this.todoRepository.merge(todo, data);
        return await this.todoRepository.save(todo);
    }

    async delete(id: string) {
        const todo = await this.findOne(id);
        return await this.todoRepository.softDelete(id);
    }
}
