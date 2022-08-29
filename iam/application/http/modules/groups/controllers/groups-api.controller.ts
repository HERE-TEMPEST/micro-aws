import { GroupsApiService, groupsApiService } from '../services';

import { Request } from 'express';

export class GroupsApiController {
  constructor(private readonly groupsService: GroupsApiService) {}

  async createGroup(request: Request) {
    const { description, name } = request.body;

    return this.groupsService.createGroup({ description, name });
  }

  async allGroups(request: Request) {
    return this.groupsService.allGroups();
  }

  async getGroupById(request: Request) {
    const { id } = request.params as { id: string };

    return this.groupsService.getGroupById(id);
  }

  async updateGroup(request: Request) {
    const { description, name } = request.body;
    const { id } = request.params as { id: string };

    return this.groupsService.updateGroup(id, { description, name });
  }

  async deleteGroup(request: Request) {
    const { id } = request.params as { id: string };

    return this.groupsService.deleteGroup(id);
  }

  async joinUser(request: Request) {
    const { groupId, userId } = request.params as { groupId: string; userId: string };

    return this.groupsService.joinUser(groupId, userId);
  }

  async excludeUser(request: Request) {
    const { groupId, userId } = request.params as { groupId: string; userId: string };

    return this.groupsService.excludeUser(groupId, userId);
  }

  async addPermission(request: Request) {
    const { groupId, roleId } = request.params as { groupId: string; roleId: string };

    return this.groupsService.addPermission(groupId, roleId);
  }

  async excludePermission(request: Request) {
    const { groupId, roleId } = request.params as { groupId: string; roleId: string };

    return this.groupsService.excludePermission(groupId, roleId);
  }
}

export const groupsApiController = new GroupsApiController(groupsApiService);
