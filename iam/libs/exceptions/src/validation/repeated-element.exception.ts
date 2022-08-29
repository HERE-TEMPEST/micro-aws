import { BaseException } from '@micro-aws-iam/exceptions';
import { IamExceptionCategories, IamExceptionSubcategories } from '../categories';

export class RepeatedElementException extends BaseException {
  constructor(message: any) {
    super(message, IamExceptionCategories.VALIDATION_ERROR, IamExceptionSubcategories.REPEATED_ELEMENT);
  }
}
