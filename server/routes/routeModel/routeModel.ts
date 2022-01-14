// imports
import { Router } from 'express';

// define a class
export default abstract class RouteModel {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  };

  protected abstract initRoutes(): void;
};