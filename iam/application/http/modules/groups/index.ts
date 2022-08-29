import { groupsApiRouter, groupsViewRouter } from './routers';
import { GroupsApiService, groupsApiService } from './services';

export default {
  services: {
    GroupsApiService: {
      baseClass: GroupsApiService,
      instance: groupsApiService,
    },
  },
  routers: [groupsApiRouter, groupsViewRouter],
};
