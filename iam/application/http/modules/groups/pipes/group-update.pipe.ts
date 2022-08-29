import { Request } from 'express';
import { EmptyRequestBodyException, InvalidStringException } from '@micro-aws-iam/exceptions';

export const updateGroupPipeValidation = (callback) => async (request: Request) => {
  const { name, description } = request.body;

  if (description) {
    if (typeof description !== 'string') {
      throw new InvalidStringException('field "description" must be a string');
    }
  }

  if (name) {
    if (typeof name !== 'string') {
      throw new InvalidStringException('field "name" must be a string');
    }
  }

  if (!description && !name) {
    throw new EmptyRequestBodyException('one of the fields must be added to update the name: ["description", "name"]');
  }

  return callback(request);
};

export interface GroupUpdateDto {
  name?: string;
  description?: string;
}
