import { BaseException } from '../base.exception';
import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class ObjectNotFoundException extends BaseException {
  constructor(message) {
    super(message, IamExceptionCategories.INVALID_REQUEST, IamExceptionSubcategories.OBJECT_NOT_FOUND);
  }
}
