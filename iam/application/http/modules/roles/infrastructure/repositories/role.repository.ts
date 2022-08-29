import { createRepository } from '@micro-aws-iam/db/postgres';
import { ObjectAlreadyExistsException, ObjectNotFoundException } from '@micro-aws-iam/exceptions';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

import { dataSource } from '../../../../config';
import { Role } from '../../domain';
import { RoleEntity } from '../entities';

export class RoleRepository {
  private readonly repository: Repository<RoleEntity>;

  constructor(dataSource: DataSource) {
    this.repository = createRepository(dataSource, RoleEntity);
  }

  async create(obj: Partial<Role>): Promise<Role> {
    const isExists = await this.repository.findOneBy({ ...obj });

    if (isExists) {
      throw new ObjectAlreadyExistsException(`Role with this the same fields already exists: "${isExists._id}"`);
    }

    return this.repository.save({
      ...obj,
    });
  }

  async all(): Promise<Array<Role>> {
    return this.repository.find();
  }

  async getById(roleId: string): Promise<Role> {
    const isExists = await this.repository.findOneBy({ _id: roleId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Role with this ID: "${roleId}" was not founded`);
    }

    return isExists;
  }

  async updateById(roleId: string, obj: Partial<Role>): Promise<UpdateResult> {
    const isExists = await this.repository.findOneBy({ _id: roleId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Role with this ID: "${roleId}" was not founded`);
    }

    return this.repository.update({ _id: roleId }, obj);
  }

  async updateByIdAndGet(roleId: string, obj: Partial<Role>): Promise<Role> {
    const isExists = await this.repository.findOneBy({ _id: roleId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Role with this ID: "${roleId}" was not founded`);
    }

    await this.repository.update({ _id: roleId }, obj);

    return isExists;
  }

  async deleteById(roleId: string): Promise<DeleteResult> {
    const isExists = await this.repository.findOneBy({ _id: roleId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Role with this ID: "${roleId}" was not founded`);
    }

    return this.repository.delete({ _id: roleId });
  }

  async deleteByIdAndGet(roleId: string): Promise<Role> {
    const isExists = await this.repository.findOneBy({ _id: roleId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Role with this ID: "${roleId}" was not founded`);
    }

    await this.repository.delete({ _id: roleId });

    return isExists;
  }
}

export const roleRepository = new RoleRepository(dataSource);
