// imports
import App from './app';
import express from 'express';
import session from 'express-session';
import SessionData from './interfaces/session';

// routes
import AuthRoute from './routes/authRoute';
import MineRoute from './routes/mineRoute';
import FarmRoute from './routes/farmRoute';
import GetAllUsersRoute from './routes/getAllUsersRoute';

// initialaze our App
const app = new App({
  port: 3000,
  middlewares: [
    express.json({ type: "application/json" }),
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: false
    }),
  ],
  routes: [
    new AuthRoute(),
    new MineRoute(),
    new FarmRoute(),
    new GetAllUsersRoute(),
  ]
});

// let's run our App
app.listen();

// let's export app
export default app;