// imports 
import { Router } from 'express';
import AuthController from '../controllers/authController';
import RouteModel from './routeModel/routeModel';

// define our Route 
class AuthRoute extends RouteModel {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.initRoutes();
  };

  protected initRoutes() {
    this.router.get('/login', new AuthController().getLogin);
    this.router.post('/login', new AuthController().postLogin);
    this.router.get('/register', new AuthController().getRegister);
    this.router.post('/register', new AuthController().postRegister);
  };
};

// export 
export default AuthRoute;