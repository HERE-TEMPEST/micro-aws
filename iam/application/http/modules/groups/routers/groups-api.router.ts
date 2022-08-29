import { Router } from 'express';

import { groupsApiController } from '../controllers';
import { createGroupPipeValidation, updateGroupPipeValidation, uuidFormatValidationPipe } from '../pipes';
import { resultIntercaptor } from '@micro-aws-iam/intercaptors';

export const groupsApiRouter = {
  prefix: 'api/v1/groups',
  router: Router()
    .post('/', resultIntercaptor(createGroupPipeValidation(groupsApiController.createGroup.bind(groupsApiController))))
    .get('/', resultIntercaptor(groupsApiController.allGroups.bind(groupsApiController)))
    .get('/:id', resultIntercaptor(uuidFormatValidationPipe(['id'], groupsApiController.getGroupById.bind(groupsApiController))))
    .patch(
      '/:id',
      resultIntercaptor(
        uuidFormatValidationPipe(['id'], updateGroupPipeValidation(groupsApiController.updateGroup.bind(groupsApiController))),
      ),
    )
    .delete(
      '/:id',
      resultIntercaptor(uuidFormatValidationPipe(['id'], groupsApiController.deleteGroup.bind(groupsApiController))),
    )
    .put(
      '/:groupId/join_user/:userId',
      resultIntercaptor(uuidFormatValidationPipe(['groupId', 'userId'], groupsApiController.joinUser.bind(groupsApiController))),
    )
    .put(
      '/:groupId/exclude_user/:userId',
      resultIntercaptor(
        uuidFormatValidationPipe(['groupId', 'userId'], groupsApiController.excludeUser.bind(groupsApiController)),
      ),
    )
    .put(
      '/:groupId/add_permission/:roleId',
      resultIntercaptor(
        uuidFormatValidationPipe(['groupId', 'roleId'], groupsApiController.addPermission.bind(groupsApiController)),
      ),
    )
    .put(
      '/:groupId/exclude_permission/:roleId',
      resultIntercaptor(
        uuidFormatValidationPipe(['groupId', 'roleId'], groupsApiController.excludePermission.bind(groupsApiController)),
      ),
    ),
};
