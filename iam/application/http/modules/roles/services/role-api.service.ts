import { RoleRepository, roleRepository } from '../infrastructure';

import { RoleCreateDto, RoleUpdateDto } from '../pipes';
import { Role } from '../domain';

export class RolesApiService {
  constructor(private readonly rolesRepository: RoleRepository) {}

  async createRole(dto: RoleCreateDto): Promise<Role> {
    return await this.rolesRepository.create(dto);
  }

  async deleteRole(roleId: string): Promise<Role> {
    return this.rolesRepository.deleteByIdAndGet(roleId);
  }

  async updateRole(roleId: string, upDto: RoleUpdateDto): Promise<Role> {
    return this.rolesRepository.updateByIdAndGet(roleId, upDto);
  }

  async getRoleById(roleId: string): Promise<Role> {
    return this.rolesRepository.getById(roleId);
  }

  async allRoles(): Promise<Role[]> {
    return this.rolesRepository.all();
  }
}

export const rolesApiService = new RolesApiService(roleRepository);
