import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './src/routes/routes';



const app = express();
const port = 5000;
dotenv.config();

app.use(cors({ origin: "http://localhost:3000" }));

mongoose.connect(
    process.env.DB_CONNECT!,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('db connected')
);

app.use(express.json());
app.use(routes);


app.listen(port, () => console.log(`api is running on http://localhost:${port}`));
