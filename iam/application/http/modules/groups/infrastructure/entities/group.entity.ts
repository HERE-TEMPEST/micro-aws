import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../../roles/infrastructure';
import { UserEntity } from '../../../users/infrastructure';
import { Group } from '../../domain';

@Entity({
  name: 'iam_groups',
})
export class GroupEntity implements Group {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { default: '' })
  description: string;

  @ManyToMany((type) => RoleEntity)
  @JoinTable()
  roles: Array<RoleEntity>;

  @ManyToMany((type) => UserEntity)
  @JoinTable()
  users: Array<UserEntity>;
}
