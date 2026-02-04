import express from 'express'
import customerRoutes from './routes/customers.js';

// app
const app = express()

// pug
app.set('view engine', 'pug');
app.set('views', './views');

// Routes
app.use('/auth', customerRoutes)

// Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});