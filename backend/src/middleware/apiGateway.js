import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Rate Limiting to prevent spam and DDoSing
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 minutes
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Logging requests
export const apiLogger = morgan('dev');
