import { RepeatedElementException, ExceededLimitException } from '@micro-aws-iam/exceptions';

import { Role } from '../../roles/domain';
import { User } from '../../users/domain';
import { Group } from './core';

export class GroupDomainModel {
  async joinUserToGroupPolicy(group: Group, user: User): Promise<Array<User>> {
    if (group.users) {
      // max 10 roles
      if (group.users.length < 5) {
        // Similar role
        if (!group.users.find((r) => r._id === user._id)) {
          return [...group.users, user];
        } else {
          throw new RepeatedElementException(`This group ID: ${group._id} already has this user: ${user._id}`);
        }
      }
    } else {
      return [user];
    }

    throw new ExceededLimitException('The limit for adding roles to a user has been exceeded. Max: 10');
  }

  async additionPermissionPolicy(group: Group, role: Role): Promise<Array<Role>> {
    if (group.roles) {
      // max 10 roles
      if (group.roles.length < 10) {
        // Similar role
        if (!group.roles.find((r) => r._id === role._id)) {
          return [...group.roles, role];
        } else {
          throw new RepeatedElementException(`This group ID: ${group._id} already has this role: ${role._id}`);
        }
      }
    } else {
      return [role];
    }

    throw new ExceededLimitException('The limit for adding roles to a user has been exceeded. Max: 10');
  }
}

export const groupDomainModel = new GroupDomainModel();
