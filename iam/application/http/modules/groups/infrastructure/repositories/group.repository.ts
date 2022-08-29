import { createRepository } from '@micro-aws-iam/db/postgres';
import { ObjectAlreadyExistsException, ObjectNotFoundException } from '@micro-aws-iam/exceptions';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

import { dataSource } from '../../../../config';
import { Group } from '../../domain/core';
import { GroupEntity } from '../entities';

export class GroupRepository {
  private readonly repository: Repository<GroupEntity>;

  constructor(dataSource: DataSource) {
    this.repository = createRepository(dataSource, GroupEntity);
  }

  async create(obj: Partial<Group>): Promise<Group> {
    const isExists = await this.repository.findOneBy({ ...obj });

    if (isExists) {
      throw new ObjectAlreadyExistsException(`Group with this the same fields already exists: "${isExists._id}"`);
    }

    return this.repository.save({
      ...obj,
    });
  }

  async all(): Promise<Array<Group>> {
    return this.repository.find();
  }

  async getById(groupId: string): Promise<Group> {
    const isExists = await this.repository.findOne({ where: { _id: groupId }, relations: { roles: true, users: true } });

    if (!isExists) {
      throw new ObjectNotFoundException(`Group with this ID: "${groupId}" was not founded`);
    }

    return isExists;
  }

  async updateById(groupId: string, obj: Partial<Group>): Promise<UpdateResult> {
    const isExists = await this.repository.findOneBy({ _id: groupId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Group with this ID: "${groupId}" was not founded`);
    }

    return this.repository.update({ _id: groupId }, obj);
  }

  async updateByIdAndGet(groupId: string, obj: Partial<Group>): Promise<Group> {
    const isExists = await this.repository.findOneBy({ _id: groupId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Group with this ID: "${groupId}" was not founded`);
    }

    await this.repository.update(groupId, obj);

    return isExists;
  }

  async deleteById(groupId: string): Promise<DeleteResult> {
    const isExists = await this.repository.findOneBy({ _id: groupId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Group with this ID: "${groupId}" was not founded`);
    }

    return this.repository.delete({ _id: groupId });
  }

  async deleteByIdAndGet(groupId: string): Promise<Group> {
    const isExists = await this.repository.findOneBy({ _id: groupId });

    if (!isExists) {
      throw new ObjectNotFoundException(`Group with this ID: "${groupId}" was not founded`);
    }

    await this.repository.delete({ _id: groupId });

    return isExists;
  }

  async save(obj: Group): Promise<Group> {
    return this.repository.save(obj);
  }
}

export const groupRepository = new GroupRepository(dataSource);
