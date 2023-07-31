const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./Data/data");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/userRoutes")
const {notFound} = require("./middleware/errorMiddleware");
const {errorHandler} = require("./middleware/errorMiddleware");
const cors = require('cors');
const chatRoutes = require("./routes/chatRoutes")



const app = express();
dotenv.config();
connectDB();



app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("API is Running");
})


app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server started running on port ${PORT}`)); 