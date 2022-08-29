import { Request, Response } from 'express';
import { resolve } from 'path';

export class HomeViewController {
  async homePage(request: Request, response: Response) {
    try {
      response.sendFile(resolve(process.cwd(), 'public', 'pages', 'home', 'home.html'));
    } catch (error) {
      console.log(error);
      response.status(404).send('Sorry');
    }
  }

  async about(request: Request, response: Response) {
    try {
      response.sendFile(resolve(process.cwd(), 'public', 'pages', 'home', 'about.html'));
    } catch (error) {
      console.log(error);
      response.status(404).send('Sorry');
    }
  }
}

export const viewRoleController = new HomeViewController();
