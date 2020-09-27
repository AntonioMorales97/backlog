const express = require('express');
const connectDB = require('./config/db');
const http = require('http');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tickets', require('./routes/api/tickets'));
//app.use('/api/users', require('./routes/api/users'));

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
