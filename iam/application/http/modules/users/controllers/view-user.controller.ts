import { Request, Response } from 'express';
import { resolve } from 'path';

export class UsersViewController {
  async allUsers(request: Request, response: Response) {
    try {
      response.sendFile(resolve(process.cwd(), 'public', 'pages', 'users', 'index.html'));
    } catch (error) {
      console.log(error);
      response.status(404).send('Sorry');
    }
  }

  async getUserById(request: Request, response: Response) {
    try {
      response.sendFile(resolve(process.cwd(), 'public', 'pages', 'users', 'user.html'));
    } catch (error) {
      console.log(error);
      response.status(404).send('Sorry');
    }
  }
}

export const viewUserController = new UsersViewController();
