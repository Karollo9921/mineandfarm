// imports 
import { Router } from 'express';
import MineController from '../controllers/mineController';
import RouteModel from './routeModel/routeModel';

// define our Route 
class MineRoute extends RouteModel {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.initRoutes();
  };

  protected initRoutes() {
    this.router.put('/mine/addGold', new MineController().addGold);
    this.router.put('/mine/upgradeMine', new MineController().upgradeMine);
  };
};

// export 
export default MineRoute;