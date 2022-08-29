import { BaseException } from '@micro-aws-iam/exceptions';

import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class InvalidBooleanException extends BaseException {
  constructor(message) {
    super(message, IamExceptionCategories.VALIDATION_ERROR, IamExceptionSubcategories.INVALID_BOOLEAN);
  }
}
