// imports 
import { Router } from 'express';
import GetAllUsersController from '../controllers/getAllUsersController';
import RouteModel from './routeModel/routeModel';

// define our Route 
class GetAllUsersRoute extends RouteModel {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.initRoutes();
  };

  protected initRoutes() {
    this.router.get('/users', new GetAllUsersController().getAllUsers);
  };
};

// export 
export default GetAllUsersRoute;