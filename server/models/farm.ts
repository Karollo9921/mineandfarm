// imports
import mongoose, { Schema } from 'mongoose';
import InterfaceFarm from '../interfaces/farm';

// define our User Model 
const FarmSchema: Schema = new Schema({
  actualLevel: { type: Boolean, unique: true },
  level: { type: Number, unique: true },
  cost: { type: Number, required: true },
  income: { type: Number, required: true },
  cooldown: { type: Number, required: true },
  lastCoolDown: { type: Number, required: true },
});

// export our Model 
export default mongoose.model<InterfaceFarm>('Farm', FarmSchema, 'farm');