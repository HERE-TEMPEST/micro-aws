import { createRepository } from '@micro-aws-iam/db/postgres';
import { ObjectAlreadyExistsException, ObjectNotFoundException } from '@micro-aws-iam/exceptions';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

import { dataSource } from '../../../../config';
import { User } from '../../domain/core';
import { UserEntity } from '../entities';

export class UserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.repository = createRepository(dataSource, UserEntity);
  }

  async create(obj: Partial<User>): Promise<User> {
    const isExists = await this.repository.findOneBy({ ...obj });

    if (isExists) {
      throw new ObjectAlreadyExistsException(`User with this the same fields already exists: "${isExists._id}"`);
    }

    return this.repository.save({
      ...obj,
    });
  }

  async all(): Promise<Array<User>> {
    return this.repository.find();
  }

  async getById(userId: string): Promise<User> {
    const isExists = await this.repository.findOne({ where: { _id: userId }, relations: { roles: true } });

    if (!isExists) {
      throw new ObjectNotFoundException(`User with this ID: "${userId}" was not founded`);
    }

    return isExists;
  }

  async updateById(userId: string, obj: Partial<User>): Promise<UpdateResult> {
    const isExists = await this.repository.findOneBy({ _id: userId });

    if (!isExists) {
      throw new ObjectNotFoundException(`User with this ID: "${userId}" was not founded`);
    }

    return this.repository.update({ _id: userId }, obj);
  }

  async updateByIdAndGet(userId: string, obj: Partial<User>): Promise<User> {
    const isExists = await this.repository.findOneBy({ _id: userId });

    if (!isExists) {
      throw new ObjectNotFoundException(`User with this ID: "${userId}" was not founded`);
    }

    await this.repository.update(userId, obj);

    return isExists;
  }

  async deleteById(userId: string): Promise<DeleteResult> {
    const isExists = await this.repository.findOneBy({ _id: userId });

    if (!isExists) {
      throw new ObjectNotFoundException(`User with this ID: "${userId}" was not founded`);
    }

    return this.repository.delete({ _id: userId });
  }

  async deleteByIdAndGet(userId: string): Promise<User> {
    const isExists = await this.repository.findOneBy({ _id: userId });

    if (!isExists) {
      throw new ObjectNotFoundException(`User with this ID: "${userId}" was not founded`);
    }

    await this.repository.delete({ _id: userId });

    return isExists;
  }

  async save(obj: User): Promise<User> {
    return this.repository.save(obj);
  }
}

export const userRepository = new UserRepository(dataSource);
