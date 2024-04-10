import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; //Import các module cần thiết từ TypeORM

@Entity() // Đánh dấu class này là một entity
export class Report {
    @PrimaryGeneratedColumn() // Đánh dấu cột này là primary key và tự động tăng
    id: number;

    @Column() // Đánh dấu cột này là một cột trong database
    price: number;

}