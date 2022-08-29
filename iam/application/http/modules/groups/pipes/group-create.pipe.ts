import { Request } from 'express';

import { InvalidStringException, FieldNotDefinedException } from '@micro-aws-iam/exceptions';

export const createGroupPipeValidation = (callback) => async (request: Request) => {
  const { name, description } = request.body;

  if (!name) {
    throw new FieldNotDefinedException('field "name" is not defined');
  }

  if (description && typeof description !== 'string') {
    throw new InvalidStringException('field "description" must be a string');
  }

  if (typeof name !== 'string') {
    throw new InvalidStringException('field "name" must be a string');
  }

  return callback(request);
};

export interface GroupCreateDto {
  name: string;
  description: string;
}
