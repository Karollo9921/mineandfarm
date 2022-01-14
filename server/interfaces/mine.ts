// import 
import { Document } from 'mongoose';

// define and export interface 
export default interface InterfaceMine extends Document {
  actualLevel: boolean;
  level: number;
  cost: number;
  income: number;
};