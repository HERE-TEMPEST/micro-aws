import { Router } from 'express';

import { usersApiController } from '../controllers';
import { createUserPipeValidation, updateUserPipeValidation, uuidFormatValidationPipe } from '../pipes';
import { resultIntercaptor } from '@micro-aws-iam/intercaptors';

export const usersApiRouter = {
  prefix: 'api/v1/users',
  router: Router()
    .post('/', resultIntercaptor(createUserPipeValidation(usersApiController.createUser.bind(usersApiController))))
    .get('/', resultIntercaptor(usersApiController.allUsers.bind(usersApiController)))
    .get('/:id', resultIntercaptor(uuidFormatValidationPipe(['id'], usersApiController.getUserById.bind(usersApiController))))
    .patch(
      '/:id',
      resultIntercaptor(
        uuidFormatValidationPipe(['id'], updateUserPipeValidation(usersApiController.updateUser.bind(usersApiController))),
      ),
    )
    .delete('/:id', resultIntercaptor(uuidFormatValidationPipe(['id'], usersApiController.deleteUser.bind(usersApiController))))
    .put(
      '/:userId/add_permission/:roleId',
      resultIntercaptor(
        uuidFormatValidationPipe(['userId', 'roleId'], usersApiController.addPermission.bind(usersApiController)),
      ),
    )
    .put(
      '/:userId/exclude_permission/:roleId',
      resultIntercaptor(
        uuidFormatValidationPipe(['userId', 'roleId'], usersApiController.excludePermission.bind(usersApiController)),
      ),
    ),
};
