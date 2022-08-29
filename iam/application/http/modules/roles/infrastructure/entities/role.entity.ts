import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../domain';

@Entity({
  name: 'iam_roles',
})
export class RoleEntity implements Partial<Role> {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column('varchar', { name: 'service_name', nullable: false })
  service: string;

  @Column('varchar', { nullable: false })
  role: string;
}
