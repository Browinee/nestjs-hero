import { Menu } from 'src/menu/entities/menu.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => User, (user) => user.roles)
  menus: Menu[];
}
