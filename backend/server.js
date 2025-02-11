require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

mongoose
  .connect('mongodb://127.0.0.1:27017/test-dh')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api/ducklings', require('./routes/ducklingRoutes'));

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
