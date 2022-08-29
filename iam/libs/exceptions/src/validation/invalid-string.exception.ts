import { BaseException } from '../base.exception';

import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class InvalidStringException extends BaseException {
  constructor(message) {
    super(message, IamExceptionCategories.VALIDATION_ERROR, IamExceptionSubcategories.INVALID_STRING);
  }
}
