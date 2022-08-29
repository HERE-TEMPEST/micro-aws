import { Router } from 'express';

import { viewRoleController } from '../controllers';

export const rolesViewRouter = {
  prefix: 'roles',
  router: Router()
    .get('/', viewRoleController.allRoles.bind(viewRoleController))
    .get('/:id', viewRoleController.getRoleById.bind(viewRoleController)),
};
