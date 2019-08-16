import AuthControllerRouter from './Auth/index';
import LocationControllerRouter from './Locations';
import PopulationControllerRouter  from './Population';

const apiPrefix = '/api/v1';

const routes = [AuthControllerRouter, LocationControllerRouter, PopulationControllerRouter];

export default (app) => {
    routes.forEach(route => app.use(apiPrefix, route));
    return app;
  };