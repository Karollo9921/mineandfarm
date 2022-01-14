// imports 
import { SessionData } from 'express-session';
import User from './user';

// define module 
declare module 'express-session' {
  interface SessionData {
    user: User,
    isLoggedIn: boolean
  }
};

// let's export this 
export default SessionData;