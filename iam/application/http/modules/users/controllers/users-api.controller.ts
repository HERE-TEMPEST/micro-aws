import { UsersApiService, usersApiService } from '../services';

import { Request } from 'express';

export class UsersApiController {
  constructor(private readonly usersService: UsersApiService) {}

  async createUser(request: Request) {
    const { login, password } = request.body;

    return this.usersService.createUser({ login, password });
  }

  async allUsers(request: Request) {
    return this.usersService.allUsers();
  }

  async getUserById(request: Request) {
    const { id } = request.params as { id: string };

    return this.usersService.getUserById(id);
  }

  async updateUser(request: Request) {
    const { login, password } = request.body;
    const { id } = request.params as { id: string };

    return this.usersService.updateUser(id, { login, password });
  }

  async deleteUser(request: Request) {
    const { id } = request.params as { id: string };

    return this.usersService.deleteUser(id);
  }

  async addPermission(request: Request) {
    const { userId, roleId } = request.params as { userId: string; roleId: string };

    return this.usersService.addPermission(userId, roleId);
  }

  async excludePermission(request: Request) {
    const { userId, roleId } = request.params as { userId: string; roleId: string };

    return this.usersService.excludePermission(userId, roleId);
  }
}

export const usersApiController = new UsersApiController(usersApiService);
