import { Request, Response } from 'express';
import { RolesApiController, rolesApiController } from './roles-api.controller';

import { JwtService } from '@micro-aws-iam/jwt';
import { configService } from '@config';
import { resolve } from 'path';

export class RolesViewController {
  constructor(private readonly apiController: RolesApiController, private readonly jwtService: JwtService) {}

  async getRoleById(request: Request, response: Response) {
    try {
      response.sendFile(resolve(process.cwd(), 'public', 'pages', 'roles', 'role.html'));
    } catch (error) {
      console.log(error);
      response.status(404).send('Sorry');
    }
  }

  async allRoles(request: Request, response: Response) {
    try {
      response.sendFile(resolve(process.cwd(), 'public', 'pages', 'roles', 'index.html'));
    } catch (error) {
      console.log(error);
      response.status(404).send('Sorry');
    }
  }

  // async allRoles(request: Request, response: Response) {
  //   try {
  //     const token = request.cookies['token'];

  //     if (token) {
  //       const { userId } = await this.jwtService.verifyAsync({ token });

  //       request.userCredentials = {
  //         userId,
  //       };
  //     }

  //     if (!request.userCredentials) {
  //       return response.redirect(302, 'https://localhost:8000/?redirect_uri=https://localhost:8001/roles');
  //     }

  //     response.redirect(302, 'https://localhost:8001/roles/index.html');
  //   } catch (error) {
  //     console.log(error);
  //     response.status(404).send('Sorry');
  //   }
  // }

  async deleteRole(request: Request, response: Response) {
    try {
      const result = await this.apiController.deleteRole(request);

      response.status(200).redirect(302, '/roles');
    } catch (error) {
      response.render('error', {
        message: {
          error,
        },
      });
    }
  }
}

export const viewRoleController = new RolesViewController(
  rolesApiController,
  new JwtService({
    secret: configService.get('JWT_SECRET'),
  }),
);
