import { BaseException } from '@micro-aws-iam/exceptions';

import { DatabaseExceptionCategories } from './enums';

export class ObjectNotFoundException extends BaseException {
  constructor(message?: any) {
    super(message || 'bad request', DatabaseExceptionCategories.OBJECT_NOT_FOUND);
  }
}
