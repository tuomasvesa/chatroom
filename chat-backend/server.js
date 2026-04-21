const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to accept JSON data
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params.id)
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold));

console.log("Server restarted!", Date.now());
