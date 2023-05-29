import express from "express";
import { connectMongoDB } from "./config/connection.js";
import bodyParser from 'body-parser';
import userRoutes from './routes/userRouter.js';
import otpRoutes from './routes/otpRouter.js';

const app = express();

const PORT = 8080;

connectMongoDB("mongodb://localhost:27017/node-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connected!!!");
}).catch((err) => {
  console.log(`DB Connection Error: ${err.message}`);
  process.exit(1);
});

app.use(bodyParser.json());

app.use('/users', userRoutes, otpRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});