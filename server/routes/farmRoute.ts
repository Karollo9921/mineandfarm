// imports 
import { Router } from 'express';
import FarmController from '../controllers/farmController';
import RouteModel from './routeModel/routeModel';

// define our Route 
class FarmRoute extends RouteModel {
  public router: Router;

  constructor() {
    super();
    this.router = Router();
    this.initRoutes();
  };

  protected initRoutes() {
    this.router.put('/farm/addGold', new FarmController().addGoldAndCooldown);
    this.router.put('/farm/upgradeFarm', new FarmController().upgradeFarm);
  };
};

// export 
export default FarmRoute;