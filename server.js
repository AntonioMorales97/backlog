const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

if (!(process.env.NODE_ENV === 'production')) {
  require('dotenv').config();
}

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tickets', require('./routes/api/tickets'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

const httpServer = http.createServer(app);
httpServer.listen(port, () =>
  console.log(`HTTP Server started on port ${port}`)
);
