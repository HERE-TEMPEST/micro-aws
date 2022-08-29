import { DataSource, Repository } from 'typeorm';

export const createRepository = <T>(dataSource: DataSource, EntityClass: new (...args: any[]) => T): Repository<T> => {
  const repository = dataSource.getRepository(EntityClass);

  return repository;
};
