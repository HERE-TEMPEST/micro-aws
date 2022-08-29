import { rolesApiRouter, rolesViewRouter } from './routers';
import { RolesApiService, rolesApiService } from './services';

export default {
  services: {
    RolesApiService: {
      baseClass: RolesApiService,
      instance: rolesApiService,
    },
  },
  routers: [rolesApiRouter, rolesViewRouter],
};
