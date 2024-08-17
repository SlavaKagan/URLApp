import express from 'express';
import rateLimit from 'express-rate-limit';
import metadataRoutes from './routes/metadataRoutes.js';
import csurf from 'csurf';

const app = express();
app.use(express.json());
app.use(csurf({ cookie: true }));

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5, // limit each IP to 5 requests per windowMs
});

app.use(limiter);

// Routes
app.use('/fetch-metadata', metadataRoutes);

// Export the app
export default app;