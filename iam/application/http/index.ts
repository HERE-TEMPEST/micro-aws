import * as express from 'express';
import { resolve } from 'path';
import * as cookieParser from 'cookie-parser';
// import { engine } from 'express-handlebars';

import modules from './modules';

export const createListener = () => {
  const app = express();

  app.use(express.static(resolve(process.cwd(), 'public', 'share')));

  // app.engine('handlebars', engine());
  // app.set('view engine', 'handlebars');
  // app.set('views', resolve(__dirname, '..', '..', 'views'));

  app.use(cookieParser());

  app.use(express.urlencoded({ extended: true }));

  // cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  app.use(express.json());

  // routing
  modules.forEach((m) => app.use('/' + m.prefix, m.router));

  // app.use(globalFilter);

  return app;
};
