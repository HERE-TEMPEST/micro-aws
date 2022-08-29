export class BaseException extends Error {
  constructor(public message: any, public category: string, public subcategory?: string) {
    super(message);
  }
}
