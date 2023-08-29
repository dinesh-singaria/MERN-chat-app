const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

const { notFound } = require("./middleware/errorMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

// app.get('/',(req,res)=>{
//     res.send("homepage");
// })

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(`server started running on port ${PORT}`)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://mern-chat-app-nj1p.onrender.com",
  },
});

io.on("connection", (socket) => {
  // console.log("Connection established");

  socket.on("setup", (user) => {
    socket.join(user._id);
    socket.emit("connected");
    // console.log(user._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
