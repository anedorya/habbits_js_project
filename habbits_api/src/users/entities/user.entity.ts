import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToMany, JoinTable
 } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Habbit } from 'src/habbits/entities/habbit.entity';

@Entity() 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Habbit)
  @JoinTable({ name: 'users_habbits' }) 
  habbits: Habbit[];
}