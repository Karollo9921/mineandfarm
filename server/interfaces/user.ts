// import 
import { Document } from 'mongoose';

// define and export interface 
export default interface InterfaceUser extends Document {
  uid: number;
  login: string;
  password: string;
  amountOfGold: number;
};