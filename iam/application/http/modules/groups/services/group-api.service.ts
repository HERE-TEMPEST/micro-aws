import { ObjectNotFoundException } from '@micro-aws-iam/exceptions';

import { Group, GroupDomainModel, groupDomainModel } from '../domain';
import { GroupRepository, groupRepository } from '../infrastructure';
import { GroupCreateDto, GroupUpdateDto } from '../pipes';
import { RolesApiService, rolesApiService } from '../../roles/services';
import { UsersApiService, usersApiService } from '../../users/services';

export class GroupsApiService {
  constructor(
    private readonly groupsRepository: GroupRepository,
    private readonly groupsDomainModel: GroupDomainModel,
    private readonly roleService: RolesApiService,
    private readonly usersApiService: UsersApiService,
  ) {}

  async createGroup(dto: GroupCreateDto): Promise<Group> {
    return this.groupsRepository.create(dto);
  }

  async deleteGroup(roleId: string): Promise<Group> {
    return this.groupsRepository.deleteByIdAndGet(roleId);
  }

  async updateGroup(groupId: string, dto: GroupUpdateDto): Promise<Group> {
    return this.groupsRepository.updateByIdAndGet(groupId, dto);
  }

  async getGroupById(groupId: string): Promise<Group> {
    return this.groupsRepository.getById(groupId);
  }

  async allGroups(): Promise<Group[]> {
    return this.groupsRepository.all();
  }

  async joinUser(groupId: string, userId: string) {
    const user = await this.usersApiService.getUserById(userId);
    const group = await this.groupsRepository.getById(groupId);

    group.users = await this.groupsDomainModel.joinUserToGroupPolicy(group, user);

    this.groupsRepository.save(group);
  }

  async excludeUser(groupId: string, userId: string) {
    const user = await this.usersApiService.getUserById(userId);
    const group = await this.groupsRepository.getById(groupId);

    const userIndex = group.users.findIndex((u) => u._id === user._id);

    if (userIndex === -1) {
      throw new ObjectNotFoundException(`User with this ID: "${userId} not found in group: ${groupId}"`);
    } else {
      group.users.splice(userIndex, 1);
    }

    this.groupsRepository.save(group);
  }

  async addPermission(groupId: string, roleId: string) {
    const role = await this.roleService.getRoleById(roleId);
    const group = await this.groupsRepository.getById(groupId);

    group.roles = await this.groupsDomainModel.additionPermissionPolicy(group, role);

    this.groupsRepository.save(group);
  }

  async excludePermission(groupId: string, roleId: string) {
    const role = await this.roleService.getRoleById(roleId);
    const group = await this.groupsRepository.getById(groupId);

    const roleIndex = group.roles.findIndex((r) => r._id === role._id);

    if (roleIndex === -1) {
      throw new ObjectNotFoundException(`Role with this ID: "${roleId} not found in group: ${groupId}"`);
    } else {
      group.roles.splice(roleIndex, 1);
    }

    this.groupsRepository.save(group);
  }
}

export const groupsApiService = new GroupsApiService(groupRepository, groupDomainModel, rolesApiService, usersApiService);
