import { Router } from 'express';

import { viewGroupController } from '../controllers';

export const groupsViewRouter = {
  prefix: 'groups',
  router: Router()
    .get('/', viewGroupController.allGroups.bind(viewGroupController))
    .get('/:id', viewGroupController.getGroupById.bind(viewGroupController)),
};
