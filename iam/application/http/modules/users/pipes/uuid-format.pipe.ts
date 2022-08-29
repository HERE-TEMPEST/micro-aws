import { Request } from 'express';
import { InvalidUuidFormatException } from '@micro-aws-iam/exceptions';

export const uuidFormatValidationPipe = (fields: Array<string>, callback) => (request: Request) => {
  const params = request.params;

  for (const key of Object.keys(params)) {
    if (fields.includes(key)) {
      if (!params[key].match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        throw new InvalidUuidFormatException(`invalid input syntax for type uuid: ${params[key]}`);
      }
    }
  }

  return callback(request);
};
