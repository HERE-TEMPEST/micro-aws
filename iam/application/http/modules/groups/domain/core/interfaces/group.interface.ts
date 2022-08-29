import { Role } from '../../../../roles/domain';
import { User } from '../../../../users/domain';

export interface Group {
  _id: string;
  name: string;
  description: string;
  roles: Array<Role>;
  users: Array<User>;
}
