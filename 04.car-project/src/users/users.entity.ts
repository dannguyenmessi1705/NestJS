import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert, // Decorator để thực thi một hàm sau khi insert
  AfterRemove, // Decorator để thực thi một hàm sau khi remove
  AfterUpdate, // Decorator để thực thi một hàm sau khi update
} from 'typeorm'; //Import các module cần thiết từ TypeORM

@Entity() // Đánh dấu class này là một entity
export class User {
  @PrimaryGeneratedColumn() // Đánh dấu cột này là primary key và tự động tăng
  id: number;

  @Column() // Đánh dấu cột này là một cột trong database
  email: string;

  @Column() // Đánh dấu cột này là một cột trong database
  password: string;

  @AfterInsert() // Decorator để thực thi một hàm sau khi insert
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterRemove() // Decorator để thực thi một hàm sau khi remove
  logRemove() {
    console.log('Removed User with id', this.id);
  }

  @AfterUpdate() // Decorator để thực thi một hàm sau khi update
  logUpdate() {
    console.log('Updated User with id', this.id);
  }
}
