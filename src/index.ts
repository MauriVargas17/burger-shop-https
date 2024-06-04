import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import burgerRoutes from './routes/burgerRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', burgerRoutes);

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGO_DB || "noDBspecified";
const msPort = process.env.MS_PORT || 3000;

mongoose.connect(`${uri}/${dbName}`).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH || 'null'),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH || 'null')
};

https.createServer(sslOptions, app).listen(msPort, () => {
  console.log(`Server is running on https://localhost:${msPort}`);
});
