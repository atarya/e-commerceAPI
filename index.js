const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');

mongoose.connect(MONGO_URI).then(console.log("DB Connected")).catch((err) => (console.error(err)));
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);

app.listen(PORT, () => { console.log("Backend server is running on: " +PORT); });