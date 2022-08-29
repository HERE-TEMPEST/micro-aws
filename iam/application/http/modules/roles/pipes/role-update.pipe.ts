import { Request } from 'express';
import { EmptyRequestBodyException, InvalidStringException } from '@micro-aws-iam/exceptions';

export const updateRolePipeValidation = (callback) => async (request: Request) => {
  const { service, role } = request.body;

  if (service) {
    if (typeof service !== 'string') {
      throw new InvalidStringException('field "service" must be a string');
    }
  }

  if (role) {
    if (typeof role !== 'string') {
      throw new InvalidStringException('field "role" must be a string');
    }
  }

  if (!service && !role) {
    throw new EmptyRequestBodyException('one of the fields must be added to update the role: ["service", "role"]');
  }

  return callback(request);
};

export interface RoleUpdateDto {
  service?: string;
  role?: string;
}
