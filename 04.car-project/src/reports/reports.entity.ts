import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne, // Decorator để thiết lập mối quan hệ nhiều-một với một entity khác
} from 'typeorm'; //Import các module cần thiết từ TypeORM

import { User } from 'src/users/users.entity';

@Entity() // Đánh dấu class này là một entity
export class Report {
  @PrimaryGeneratedColumn() // Đánh dấu cột này là primary key và tự động tăng
  id: number;

  @Column() // Đánh dấu cột này là một cột trong database
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @ManyToOne(() => User, (user) => user.reports) // Mối quan hệ nhiều-một với entity User với điều kiện một report chỉ thuộc về một user
  // () => User: Entity mà mối quan hệ được thiết lập
  // (user) => user.reports: Field trong entity User mà mối quan hệ được thiết lập, được khai báo trong entity User
  user: User; // User tạo ra report này
}
