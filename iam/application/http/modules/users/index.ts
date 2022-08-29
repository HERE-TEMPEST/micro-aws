import { usersApiRouter, usersViewRouter } from './routers';
import { UsersApiService, usersApiService } from './services';

export default {
  services: {
    UsersApiService: {
      baseClass: UsersApiService,
      instance: usersApiService,
    },
  },
  routers: [usersApiRouter, usersViewRouter],
};
