import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const todoEntityList: TodoEntity[] = [
    new TodoEntity({ id: '1', task: 'task-1', isDone: 0 }),
    new TodoEntity({ id: '2', task: 'task-2', isDone: 0 }),
    new TodoEntity({ id: '3', task: 'task-3', isDone: 0 }),
];

const newTodoEntity = new TodoEntity({ task: 'new-task', isDone: 0 });
const updateTodoEntity = new TodoEntity({ id: '1', task: 'update-task', isDone: 0 });

describe('TodoController', () => {
    let todoController: TodoController;
    let todoService: TodoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TodoController],
            providers: [
                {
                    provide: TodoService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue(todoEntityList),
                        create: jest.fn().mockResolvedValue(newTodoEntity),
                        findOne: jest.fn().mockResolvedValue(todoEntityList[0]),
                        update: jest.fn().mockResolvedValue(updateTodoEntity),
                        delete: jest.fn().mockResolvedValue(undefined),
                    },
                },
            ],
        }).compile();

        todoController = module.get<TodoController>(TodoController);
        todoService = module.get<TodoService>(TodoService);
    });

    it('should be defined', () => {
        expect(todoController).toBeDefined();
        expect(todoService).toBeDefined();
    });

    describe('index', () => {
        it('should return a object with a a todo list on items with successfully', async () => {
            // Arrange
            // Act
            const result = await todoController.index();
            // Assert
            expect(result).toEqual({ items: todoEntityList });
            expect(typeof result).toEqual('object');
            expect(todoService.findAll).toHaveBeenCalledTimes(1);
        });
        it('should throw an exception', async () => {
            // Arrange
            jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());
            // Act
            // Assert
            expect(todoController.index()).rejects.toThrowError();
        });
    });

    describe('create', () => {
        it('should create a new todo item successfully', async () => {
            // Arrange
            const body: CreateTodoDTO = {
                task: 'new-task',
                isDone: 0,
            };
            // Act
            const result = await todoController.create(body);
            // Assert
            expect(result).toEqual(newTodoEntity);
            expect(todoService.create).toHaveBeenCalledTimes(1);
            expect(todoService.create).toHaveBeenCalledWith(body);
        });
        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());
            const body: CreateTodoDTO = {
                task: 'new-task',
                isDone: 0,
            };
            // Act
            // Assert
            expect(todoController.create(body)).rejects.toThrowError();
        });
    });

    describe('show', () => {
        it('should get a todo item successfully', async () => {
            // Arrange
            // Act
            const result = await todoController.show('1');
            // Assert
            expect(result).toEqual(todoEntityList[0]);
            expect(todoService.findOne).toHaveBeenCalledTimes(1);
            expect(todoService.findOne).toHaveBeenCalledWith('1');
        });

        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(todoService, 'findOne').mockRejectedValueOnce(new NotFoundException());
            // Act
            // Assert
            expect(todoController.show('1')).rejects.toThrowError();
        });
    });

    describe('update', () => {
        it('should update a todo item successfully', async () => {
            // Arrange
            const body: UpdateTodoDTO = {
                task: 'update-task',
                isDone: 1,
            };
            // Act
            const result = await todoController.update('1', body);
            // Assert
            expect(result).toEqual(updateTodoEntity);
            expect(todoService.update).toHaveBeenCalledTimes(1);
            expect(todoService.update).toHaveBeenCalledWith('1', body);
        });

        it('should throw an exception', () => {
            // Arrange
            const body: UpdateTodoDTO = {
                task: 'update-task',
                isDone: 1,
            };
            jest.spyOn(todoService, 'update').mockRejectedValueOnce(new NotFoundException());
            // Act
            // Assert
            expect(todoController.update('1', body)).rejects.toThrowError();
        });
    });

    describe('delete', () => {
        it('should delete a todo item successfully', async () => {
            // Act
            const result = await todoController.delete('1');
            // Assert
            expect(result).toBeUndefined();
            expect(todoService.delete).toHaveBeenCalledTimes(1);
            expect(todoService.delete).toHaveBeenCalledWith('1');
        });
        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(todoService, 'delete').mockRejectedValueOnce(new NotFoundException());
            // Act
            // Assert
            expect(todoController.delete('1')).rejects.toThrowError();
        });
    });
});
