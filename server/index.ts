import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './src/routes/routes';
import path from 'path';


const app = express();
const port = 5000;
dotenv.config();

app.use('/tours', express.static(path.join(__dirname, 'public', 'tours')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: "http://localhost:3000" }));
// app.use(cors({ origin: "http://localhost:5500" }));

mongoose.connect(
    process.env.DB_CONNECT!,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('db connected')
);

app.use(express.json());
app.use(routes);


app.listen(port, () => console.log(`api is running on http://localhost:${port}`));
