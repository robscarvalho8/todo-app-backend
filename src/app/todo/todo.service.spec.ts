import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { TodoService } from './todo.service';

const todoEntityList: TodoEntity[] = [
    new TodoEntity({ id: '1', task: 'task-1', isDone: 0 }),
    new TodoEntity({ id: '2', task: 'task-2', isDone: 0 }),
    new TodoEntity({ id: '3', task: 'task-3', isDone: 0 }),
];

const updatedTodoEntityItem = new TodoEntity({ id: '1', task: 'task-1', isDone: 1 });

describe('TodoService', () => {
    let todoService: TodoService;
    let todoRepository: Repository<TodoEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TodoService,
                {
                    provide: getRepositoryToken(TodoEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue(todoEntityList),
                        findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
                        create: jest.fn().mockReturnValue(todoEntityList[0]),
                        save: jest.fn().mockResolvedValue(todoEntityList[0]),
                        merge: jest.fn().mockReturnValue(updatedTodoEntityItem),
                        softDelete: jest.fn().mockReturnValue(undefined),
                    },
                },
            ],
        }).compile();

        todoService = module.get<TodoService>(TodoService);
        todoRepository = module.get(getRepositoryToken(TodoEntity));
    });

    it('should be defined', () => {
        expect(todoService).toBeDefined();
        expect(todoRepository).toBeDefined();
    });

    describe('findAll', () => {
        it('should return a todo entity list successfully', async () => {
            // Arrange
            // Act
            const result = await todoService.findAll();
            // Assert
            expect(result).toEqual(todoEntityList);
            expect(todoRepository.find).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(todoRepository, 'find').mockRejectedValueOnce(new Error());
            // Act
            // Assert
            expect(todoService.findAll()).rejects.toThrowError();
            expect(todoRepository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOneOrFail', () => {
        it('should return a todo entity item successfully', async () => {
            // Arrange
            // Act
            const result = await todoService.findOne('1');
            // Assert
            expect(result).toEqual(todoEntityList[0]);
            expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
        });
        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(todoRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());
            // Act
            // Assert
            expect(todoService.findOne('1')).rejects.toThrowError();
            expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
        });
    });

    describe('create', () => {
        it('should create a todo entity item successfully', async () => {
            // Arrange
            const data: CreateTodoDTO = { task: 'task-1', isDone: 0 };
            // Act
            const result = await todoService.create(data);
            // Assert
            expect(result).toEqual(todoEntityList[0]);
            expect(todoRepository.save).toHaveBeenCalledTimes(1);
            expect(todoRepository.create).toHaveBeenCalledTimes(1);
        });
        it('should throw an exception', () => {
            // Arrange
            const data: CreateTodoDTO = { task: 'task-1', isDone: 0 };
            jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());
            // Act
            // Assert
            expect(todoService.create(data)).rejects.toThrowError();
            expect(todoRepository.save).toHaveBeenCalledTimes(1);
        });
    });

    describe('update', () => {
        it('should update a todo entity item successfully', async () => {
            // Arrange
            jest.spyOn(todoRepository, 'save').mockResolvedValue(updatedTodoEntityItem);
            const data: UpdateTodoDTO = { task: 'task-1', isDone: 1 };
            // Act
            const result = await todoService.update('1', data);
            // Assert
            expect(result).toEqual(updatedTodoEntityItem);
            expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
            expect(todoRepository.merge).toHaveBeenCalledTimes(1);
            expect(todoRepository.save).toHaveBeenCalledTimes(1);
        });
        it('should throw an not found exception', () => {
            // Arrange
            const data: UpdateTodoDTO = { task: 'task-1', isDone: 1 };
            jest.spyOn(todoRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());
            // Act
            // Assert
            expect(todoService.update('1', data)).rejects.toThrowError();
            expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            // Arrange
            const data: UpdateTodoDTO = { task: 'task-1', isDone: 1 };
            jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());
            // Act
            // Assert
            expect(todoService.update('1', data)).rejects.toThrowError();
        });
    });

    describe('delete', () => {
        it('should delete a todo entity item successfully', async () => {
            // Arrange
            // Act
            const result = await todoService.delete('1');
            // Assert
            expect(result).toBeUndefined();
            expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
            expect(todoRepository.softDelete).toHaveBeenCalledTimes(1);
        });
        it('should throw an not found exception', () => {
            // Arrange
            jest.spyOn(todoRepository, 'findOneOrFail').mockRejectedValueOnce(new Error());
            // Act
            // Assert
            expect(todoService.delete('1')).rejects.toThrowError();
            expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            // Arrange
            jest.spyOn(todoRepository, 'softDelete').mockRejectedValueOnce(new Error());
            // Act
            // Assert
            expect(todoService.delete('1')).rejects.toThrowError();
        });
    });
});
