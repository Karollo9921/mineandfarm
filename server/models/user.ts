// imports
import mongoose, { Schema } from 'mongoose';
import InterfaceUser from '../interfaces/user';

// define our User Model 
const UserSchema: Schema = new Schema({
  uid: { type: Number, unique: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  amountOfGold: { type: Number, required: true }
});

// export our Model 
export default mongoose.model<InterfaceUser>('User', UserSchema);