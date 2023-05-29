import { set, connect } from "mongoose";
set('strictQuery', true);

export const connectMongoDB = async (url) => {
    return connect(url);
  };
  