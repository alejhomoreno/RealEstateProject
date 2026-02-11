import express from 'express'
import customerRoutes from './routes/customers.js';
import db from './config/db.js';


// app
const app = express()

// reading form
app.use(express.urlencoded({extended: true}))

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
app.use( express.static('public'))

// Routes
app.use('/auth', customerRoutes)

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});