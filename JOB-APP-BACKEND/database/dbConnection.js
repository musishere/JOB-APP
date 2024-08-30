import mongoose from 'mongoose';

export const connectDb = () => {
   mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
         console.log('connected to database');
      })
      .catch((err) => {
         console.log(`some error ocurred while connecting database: ${err}`);
      });
};
