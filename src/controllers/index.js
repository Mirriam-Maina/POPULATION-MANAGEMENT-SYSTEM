import AuthControllerRouter from './Auth/index';
import LocationControllerRouter from './Locations';

const apiPrefix = '/api/v1';

const routes = [AuthControllerRouter, LocationControllerRouter];

export default (app) => {
    routes.forEach(route => app.use(apiPrefix, route));
    return app;
  };