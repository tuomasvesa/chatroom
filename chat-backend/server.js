const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const http = require("http");
const { Server } = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const Message = require("./models/messageModel");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// testing if the old servers code works here
const server = http.createServer(app);
const io = new Server(server, {
  // React dev origin
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json()); // to accept JSON data
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running!");
});

// More old server code
// Socket.IO handlers
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room); // this should join socket for users that are in the same chatroom
    console.log("User joined in Room ", room);
  });

  socket.on("new message", async (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
    // try {
    //   const { sender, content, chat } = data;
    //   const chatMessage = new Message({ sender, content, chat });
    //   await chatMessage.save();
    //   // Emit to everyone (including sender)
    //   io.emit("message", chatMessage);
    // } catch (error) {
    //   console.error("Error when saving message: ", error);
    // }
  });

  socket.on("disconnect", (reason) => {
    console.log("A user disconnected: ", socket.id, reason);
  });
});

server.listen(PORT, () =>
  console.log(`Server started on PORT ${PORT}`.yellow.bold),
);

console.log("Server restarted!", Date.now());
