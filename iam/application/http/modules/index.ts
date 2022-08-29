import roleModule from './roles';
import homeModule from './home';
import userModule from './users';
import groupModule from './groups';

import { Router } from 'express';

interface ModuleInterface {
  prefix: string;
  router: Router;
}

const routers: Array<ModuleInterface> = [
  ...roleModule.routers,
  ...userModule.routers,
  ...homeModule.routers,
  ...groupModule.routers,
];

export default routers;
