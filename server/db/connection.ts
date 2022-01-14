// let's import 
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// call variables
dotenv.config();

// let's setup a connection
const connectWithMongo = async () => {
  try {

    const connection = await mongoose.connect(process.env.MONGO_URL!);
    console.log(`MongoDB Connected on ${connection.connection.host}`);

  } catch (error: any) {

    console.error(`Error: ${error.message}`);
    process.exit(1);

  };
};

// export connections function 
export { connectWithMongo };