import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { apiLimiter, apiLogger } from './middleware/apiGateway.js';
import authRoutes from './routes/authRoutes.js';
import claimRoutes from './routes/claimRoutes.js';

dotenv.config();

const app = express();

// Gateway Middleware
app.use(cors());
app.use(express.json());
app.use(apiLogger);
app.use('/api', apiLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/claims', claimRoutes);

// Connect Database
connectDB();

app.get('/', (req, res) => {
    res.send('Vediere Anti-HMO System Backend API Running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
