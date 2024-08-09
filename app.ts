import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './app-services/user-service/src/users.route';
import productRoutes from './app-services/product-service/src/product.route';
import authRoutes from './app-services/auth-service/src/auth.route';
import cors from "cors"
import path from "path"
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.DB_URL_LOCAL || '').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/api/v1', userRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);

export default app;
