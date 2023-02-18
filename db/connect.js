import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

