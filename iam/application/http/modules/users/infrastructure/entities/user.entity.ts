import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../../roles/infrastructure';
import { User } from '../../domain';

@Entity({
  name: 'iam_users',
})
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column('varchar', { nullable: false })
  login: string;

  @Column('varchar', { nullable: false })
  password: string;

  @ManyToMany((type) => RoleEntity)
  @JoinTable()
  roles: Array<RoleEntity>;

  // @Column('varchar', { nullable: false })
  // accessKey: string;

  // @Column('varchar', { nullable: false })
  // secretKey: string;
}
