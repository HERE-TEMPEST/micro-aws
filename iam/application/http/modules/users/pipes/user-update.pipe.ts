import { Request } from 'express';
import { EmptyRequestBodyException, InvalidStringException } from '@micro-aws-iam/exceptions';

export const updateUserPipeValidation = (callback) => async (request: Request) => {
  const { login, password } = request.body;

  if (password) {
    if (typeof password !== 'string') {
      throw new InvalidStringException('field "password" must be a string');
    }
  }

  if (login) {
    if (typeof login !== 'string') {
      throw new InvalidStringException('field "login" must be a string');
    }
  }

  if (!password && !login) {
    throw new EmptyRequestBodyException('one of the fields must be added to update the login: ["password", "login"]');
  }

  return callback(request);
};

export interface UserUpdateDto {
  password?: string;
  login?: string;
}
