// import 
import { Document } from 'mongoose';

// define and export interface 
export default interface InterfaceFarm extends Document {
  actualLevel: boolean;
  level: number;
  cost: number;
  income: number;
  cooldown: number;
  lastCooldown: number;
};