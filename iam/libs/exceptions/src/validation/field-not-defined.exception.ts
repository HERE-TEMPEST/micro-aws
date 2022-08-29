import { BaseException } from '../base.exception';

import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class FieldNotDefinedException extends BaseException {
  constructor(message) {
    super(message, IamExceptionCategories.VALIDATION_ERROR, IamExceptionSubcategories.MISSING_PROPERTY);
  }
}
