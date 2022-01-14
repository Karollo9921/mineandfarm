// imports
import mongoose, { Schema } from 'mongoose';
import InterfaceMine from '../interfaces/mine';

// define our User Model 
const MineSchema: Schema = new Schema({
  actualLevel: { type: Boolean, unique: true },
  level: { type: Number, unique: true },
  cost: { type: Number, required: true },
  income: { type: Number, required: true }
});

// export our Model 
export default mongoose.model<InterfaceMine>('Mine', MineSchema, 'mine');