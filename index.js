import 'dotenv/config';
import express from 'express'
import customerRoutes from './routes/customers.js';
import propertiesRoutes from './routes/propertiesRoutes.js';
import db from './config/db.js';
import helmet from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
import cookieParser from 'cookie-parser';


// app
const app = express()

// enable helmet
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-eval'", "https://unpkg.com", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://*.tile.openstreetmap.org", "https://unpkg.com"],
        connectSrc: ["'self'", "https://*.tile.openstreetmap.org", "https://unpkg.com","https://geocode.arcgis.com"]
    },
}));

// reading form
app.use(express.urlencoded({ extended: true }))

// enable cookie parser
app.use(cookieParser())

// configure csfr protection
// 4. Configure CSRF
// We will log the output to verify the function exists
const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
  getSecret: () => "SUPER_SECRET_KEY_1234567890",
  cookieName: "x-csrf-token",
  cookieOptions: {
    sameSite: "lax",
    secure: false,
    signed: false
  },
  getCsrfTokenFromRequest: (req) => req.body._csrf,
  getSessionIdentifier: (req) => "temp_identifier_for_public_users"
});



// Apply CSRF protection
app.use(doubleCsrfProtection);

// Middleware to pass the token to every view (Pug) automatically
app.use((req, res, next) => {
  res.locals.csrfToken = generateCsrfToken(req, res);
  next();
});

// Database connection
try {
  await db.authenticate();
  db.sync();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// pug
app.set('view engine', 'pug');
app.set('views', './views');

// public
app.use(express.static('public'))

// Routes
app.use('/auth', customerRoutes)
app.use('/', propertiesRoutes)



// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});