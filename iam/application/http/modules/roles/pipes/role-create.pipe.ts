import { Request } from 'express';

import { FieldNotDefinedException, InvalidStringException } from '@micro-aws-iam/exceptions';

export const createRolePipeValidation = (callback) => async (request: Request) => {
  const { service, role } = request.body;

  if (!service) {
    throw new FieldNotDefinedException('field "service" is not defined');
  }

  if (!role) {
    throw new FieldNotDefinedException('field "role" is not defined');
  }

  if (typeof service !== 'string') {
    throw new InvalidStringException('field "service" must be a string');
  }

  if (typeof role !== 'string') {
    throw new InvalidStringException('field "role" must be a string');
  }

  return callback(request);
};

export interface RoleCreateDto {
  service: string;
  role: string;
}
