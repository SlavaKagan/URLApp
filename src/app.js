import express from 'express';
import rateLimit from 'express-rate-limit';
import metadataRoutes from './routes/metadataRoutes.js';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

const app = express();

// Parse cookies before CSRF middleware
app.use(cookieParser());

// Setup body parser
app.use(express.json());

// Setup CSRF protection (using cookies)
app.use(csurf({ cookie: true }));

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5, // limit each IP to 5 requests per windowMs
});

app.use(limiter);

// Routes
app.use('/fetch-metadata', metadataRoutes);

app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  next()
})


// Export the app
export default app;