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
    this.router.put('/mine/add-gold', new MineController().addGold);
    this.router.put('/mine/upgrade-mine', new MineController().upgradeMine);
  };
};

// export 
export default MineRoute;