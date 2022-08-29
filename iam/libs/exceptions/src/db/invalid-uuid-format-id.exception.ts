import { BaseException } from '../base.exception';
import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class InvalidUuidFormatException extends BaseException {
  constructor(message) {
    super(message, IamExceptionCategories.INVALID_REQUEST, IamExceptionSubcategories.INVALID_UUID);
  }
}
