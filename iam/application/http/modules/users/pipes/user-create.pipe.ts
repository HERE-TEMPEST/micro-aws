import { Request } from 'express';

import { InvalidStringException, FieldNotDefinedException } from '@micro-aws-iam/exceptions';

export const createUserPipeValidation = (callback) => async (request: Request) => {
  const { login, password } = request.body;

  if (!password) {
    throw new FieldNotDefinedException('field "password" is not defined');
  }

  if (!login) {
    throw new FieldNotDefinedException('field "login" is not defined');
  }

  if (typeof password !== 'string') {
    throw new InvalidStringException('field "password" must be a string');
  }

  if (typeof login !== 'string') {
    throw new InvalidStringException('field "login" must be a string');
  }

  return callback(request);
};

export interface UserCreateDto {
  password: string;
  login: string;
}
