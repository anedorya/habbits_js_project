import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToMany, JoinTable, 
 } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Habbits } from 'src/habbits/entities/habbit.entity';

@Entity() 
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => Habbits, (habbit) => habbit.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ 
    name: 'users_habbits',
    joinColumn: 
      {
      name: 'userId', 
      referencedColumnName: 'id',
    },
    inverseJoinColumn: 
      { 
      name: 'habbitId', 
      referencedColumnName: 'id'}
    
  }) 
  habbits!: Habbits[];


  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  googleAccessToken!: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  googleRefreshToken!: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'bigint', nullable: true })
  googleTokenExpiry!: number;


}