import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    task: string;

    @Column({ name: 'is_done', type: 'int', width: 1 })
    isDone: number;

    @Column({ name: 'created_at' })
    createdAt: string;

    @Column({ name: 'updated_at' })
    updatedAt: string;

    @Column({ name: 'deleted_at' })
    deletedAt: string;
}
