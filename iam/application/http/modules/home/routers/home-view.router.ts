import { Router } from 'express';

import { viewRoleController } from '../controllers';

export const homeViewRouter = {
  prefix: '',
  router: Router()
    .get('/', viewRoleController.homePage.bind(viewRoleController))
    .get('/about', viewRoleController.about.bind(viewRoleController)),
};
