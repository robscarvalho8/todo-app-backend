import { classToPlain, Exclude, Expose } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column()
    @Expose()
    task: string;

    @Column({ name: 'is_done', type: 'int', width: 1 })
    @Expose()
    isDone: number;

    @CreateDateColumn({ name: 'created_at' })
    @Expose()
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    @Exclude()
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    @Exclude()
    deletedAt: string;

    toJSON() {
        return classToPlain(this);
    }
}
