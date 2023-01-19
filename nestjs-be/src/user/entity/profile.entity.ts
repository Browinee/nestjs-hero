import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  photo: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
