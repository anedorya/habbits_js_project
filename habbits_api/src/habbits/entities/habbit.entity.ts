import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToMany
 } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity() 
export class Habbit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.habbits)
  users: User[];
}