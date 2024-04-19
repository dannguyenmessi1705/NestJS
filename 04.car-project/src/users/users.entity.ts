import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert, // Decorator để thực thi một hàm sau khi insert
  AfterRemove, // Decorator để thực thi một hàm sau khi remove
  AfterUpdate, // Decorator để thực thi một hàm sau khi update
  OneToMany, // Decorator để thiết lập mối quan hệ một-nhiều với một entity khác
} from 'typeorm'; //Import các module cần thiết từ TypeORM

import { Report } from 'src/reports/reports.entity';
import { report } from 'process';

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

  @OneToMany(() => Report, (report) => report.user) // Mối quan hệ một-nhiều với entity Report với điều kiện một user có thể tạo nhiều report
  // () => Report: Entity mà mối quan hệ được thiết lập
  // (report) => report.user: Field trong entity Report mà mối quan hệ được thiết lập, .user được khai báo trong entity Report
  reports: Report[]; // Mảng chứa các report của user
}
