import { BaseException } from '../base.exception';

import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class InvalidIntegerException extends BaseException {
  constructor(message) {
    super(message, IamExceptionCategories.VALIDATION_ERROR, IamExceptionSubcategories.INVALID_INTEGER);
  }
}
