import { BaseException } from '../base.exception';
import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class ObjectAlreadyExistsException extends BaseException {
  constructor(message) {
    super(message, IamExceptionCategories.VALIDATION_ERROR, IamExceptionSubcategories.OBJECT_ALREADY_EXISTS);
  }
}
