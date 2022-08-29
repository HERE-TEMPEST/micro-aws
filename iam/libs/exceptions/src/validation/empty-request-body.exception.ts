import { BaseException } from '@micro-aws-iam/exceptions';
import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class EmptyRequestBodyException extends BaseException {
  constructor(message) {
    super(message, IamExceptionCategories.VALIDATION_ERROR, IamExceptionSubcategories.EMPTY_REQUEST_BODY);
  }
}
