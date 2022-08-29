import { RolesApiService, rolesApiService } from '../services';

import { Request } from 'express';

export class RolesApiController {
  constructor(private readonly rulesService: RolesApiService) {}

  async createRole(request: Request) {
    const { role, service } = request.body;

    return this.rulesService.createRole({ role, service });
  }

  async deleteRole(request: Request) {
    const { id } = request.params as { id: string };

    return this.rulesService.deleteRole(id);
  }

  async allRoles(request: Request) {
    return this.rulesService.allRoles();
  }

  async updateRole(request: Request) {
    const { role, service } = request.body;
    const { id } = request.params as { id: string };

    return this.rulesService.updateRole(id, { role, service });
  }

  async getRoleById(request: Request) {
    const { id } = request.params as { id: string };

    return this.rulesService.getRoleById(id);
  }
}

export const rolesApiController = new RolesApiController(rolesApiService);
