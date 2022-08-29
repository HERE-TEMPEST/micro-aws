import { Router } from 'express';

import { rolesApiController } from '../controllers';
import { createRolePipeValidation, updateRolePipeValidation, uuidFormatValidationPipe } from '../pipes';
import { resultIntercaptor } from '@micro-aws-iam/intercaptors';

export const rolesApiRouter = {
  prefix: 'api/v1/roles',
  router: Router()
    .post('/', resultIntercaptor(createRolePipeValidation(rolesApiController.createRole.bind(rolesApiController))))
    .get('/', resultIntercaptor(rolesApiController.allRoles.bind(rolesApiController)))
    .get('/:id', resultIntercaptor(uuidFormatValidationPipe(['id'], rolesApiController.getRoleById.bind(rolesApiController))))
    .patch(
      '/:id',
      resultIntercaptor(
        uuidFormatValidationPipe(['id'], updateRolePipeValidation(rolesApiController.updateRole.bind(rolesApiController))),
      ),
    )
    .delete('/:id', resultIntercaptor(uuidFormatValidationPipe(['id'], rolesApiController.deleteRole.bind(rolesApiController)))),
};
