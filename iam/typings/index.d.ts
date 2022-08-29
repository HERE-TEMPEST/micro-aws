import { configService } from '@config';

declare global {
  namespace Express {
    interface Request {
      userCredentials?: {
        userId: string;
      };
    }
  }
}
