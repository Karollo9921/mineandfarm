// main imports
import express from 'express';

// import types
import { Application } from 'express';
import RouteModel from './routes/routeModel/routeModel';

// other imports
import dotenv from 'dotenv';
import { connectWithMongo } from './db/connection';

// define an App class 
class App {
  public port: number;
  public app: Application;

  constructor(appSetup: { 
    port: number,
    middlewares: any,
    routes: RouteModel[]
   }) {

    this.app = express();
    dotenv.config();
    connectWithMongo();
    this.port = +process.env.PORT! || appSetup.port;
    this.useMiddlewares(appSetup.middlewares);
    this.useRoutes(appSetup.routes);

   };

  // app listen
  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`This server is listening on port ${this.port}`)
    })
  };

  // call middlewares functions
  private useMiddlewares(middlewares: any) {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  };

  // call routes functions
  private useRoutes(routes: RouteModel[]) {
    routes.forEach((route: RouteModel) => {
      this.app.use('/api', route.router);
    });
  };
};

// export class
export default App;
