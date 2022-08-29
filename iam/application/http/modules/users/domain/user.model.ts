import { ExceededLimitException, RepeatedElementException } from '@micro-aws-iam/exceptions';

import { Role } from '../../roles/domain';
import { User } from './core';

export class UserDomainModel {
  async additionPermissionPolicy(user: User, role: Role): Promise<Array<Role>> {
    if (user.roles) {
      // max 10 roles
      if (user.roles.length < 10) {
        // Similar role
        if (!user.roles.find((r) => r._id === role._id)) {
          return [...user.roles, role];
        } else {
          throw new RepeatedElementException(`This user ID: ${user._id} already has this role: ${role._id}`);
        }
      }
    } else {
      return [role];
    }

    throw new ExceededLimitException('The limit for adding roles to a user has been exceeded. Max: 10');
  }
}

export const userDomainModel = new UserDomainModel();
