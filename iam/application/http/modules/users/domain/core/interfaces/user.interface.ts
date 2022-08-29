import { Role } from '../../../../roles/domain';

export interface User {
  _id: string;
  login: string;
  password: string;
  roles: Array<Role>;
}
