import { ObjectNotFoundException } from '@micro-aws-iam/exceptions';

import { User, UserDomainModel, userDomainModel } from '../domain';
import { UserRepository, userRepository } from '../infrastructure';
import { UserCreateDto, UserUpdateDto } from '../pipes';
import { RolesApiService, rolesApiService } from '../../roles/services';

export class UsersApiService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly usersDomainModel: UserDomainModel,
    private readonly roleService: RolesApiService,
  ) {}

  async createUser(dto: UserCreateDto): Promise<User> {
    return this.usersRepository.create(dto);
  }

  async deleteUser(roleId: string): Promise<User> {
    return this.usersRepository.deleteByIdAndGet(roleId);
  }

  async updateUser(userId: string, dto: UserUpdateDto): Promise<User> {
    return this.usersRepository.updateByIdAndGet(userId, dto);
  }

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.getById(userId);
  }

  async allUsers(): Promise<User[]> {
    return this.usersRepository.all();
  }

  async addPermission(userId: string, roleId: string) {
    const role = await this.roleService.getRoleById(roleId);
    const user = await this.usersRepository.getById(userId);

    user.roles = await this.usersDomainModel.additionPermissionPolicy(user, role);

    this.usersRepository.save(user);
  }

  async excludePermission(userId: string, roleId: string) {
    const role = await this.roleService.getRoleById(roleId);
    const user = await this.usersRepository.getById(userId);

    const roleIndex = user.roles.findIndex((r) => r._id === role._id);

    if (roleIndex === -1) {
      throw new ObjectNotFoundException(`Role with this ID: "${roleId} not found in user: ${userId}"`);
    } else {
      user.roles.splice(roleIndex, 1);
    }

    this.usersRepository.save(user);
  }
}

export const usersApiService = new UsersApiService(userRepository, userDomainModel, rolesApiService);
