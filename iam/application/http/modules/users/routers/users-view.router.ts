import { Router } from 'express';

import { viewUserController } from '../controllers';

export const usersViewRouter = {
  prefix: 'users',
  router: Router()
    .get('/', viewUserController.allUsers.bind(viewUserController))
    .get('/:id', viewUserController.getUserById.bind(viewUserController)),
};
