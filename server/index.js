const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');
const path = require('path');
const { setUploadFolder } = require('./src/routes/uploadMiddleware');

const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.set('views', 'src/views');

dotenv.config({ path: path.join(__dirname, '.env') });
setUploadFolder();




app.use('/tours', express.static(path.join(__dirname, 'public', 'tours')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: "http://localhost:3000" }));

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true },
    () => console.log('db connected')
);

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`api is running on http://localhost:${port}`));
