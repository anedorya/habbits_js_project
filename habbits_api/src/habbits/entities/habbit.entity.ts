import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToMany
 } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';

@Entity() 
export class Habbits {
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

  @ManyToMany(() => Users, (user) => user.habbits)
  users: Users[];
}