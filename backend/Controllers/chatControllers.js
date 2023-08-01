const asyncHandler = require("express-async-handler");
const Chat  =  require ("../Models/chatModel")
const User  =  require ("../Models/userModel")

const accessChat = asyncHandler(async(req,res) => {
    const {userId} = req.body;

    if (!userId) {
        console.log("Please provide user id")
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({isGroupChat: false,
        $and:[
            {users: {$elemMatch:{$eq: req.user._id}}},
            {users: {$elemMatch:{$eq: userId}}}
        ],
    })
    .populate("users","-password")
    .populate("latestMessage");

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    })

    if (isChat.Length > 0) {
        res.sendStatus(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
            
        }
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password");

            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400).send(error);
            throw new Error(error.message);
            
        }
    }
});

const fetchChats = asyncHandler(async(req, res)=>{
    try {
        Chat.find({users:{$elemMatch: {$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results = await User.populate(results,{
            path:"latestMessage.sender",
            select:"name pic email"
            });

        res.status(200).send(results);
        });
    } catch (error) {
        res.status(400).send
        throw new Error(error.message);
    }
})

const createGroupChat = asyncHandler(async(req, res)=>{
    if (!req.body.users || !req.body.name){
        return res.status(400).send("Please provide users and name");
    }
    var users = JSON.parse(req.body.users)

    if  (users.length<2){
        return res.status(400).send("Please provide atleast 2 users");
    }

    users.push(req.user); 

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            groupAdmin: req.user._id,
            users: users,
        });

        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password");

        res.status(200).send(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const renameGroup = asyncHandler(async(req, res)=>{
    const{chatId, chatName}=req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
                {chatName},
                {new: true},
    ).populate("users","-password")
    .populate("groupAdmin","-password");

    if (!updatedChat){
        res.send(404);
        throw new Error("Chat not found")
    }else{
        res.json(updatedChat);
    }
})

const addToGroup = asyncHandler(async(req, res)=>{
    const{chatId, userId}=req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
          {$push: {users: userId}},
          {new: true},
    ).populate("users","-password")
    .populate("groupAdmin","-password")

    if(!added){
        res.send(404);
        throw new Error("Chat not found")
    }else{
        res.json(added);
    }
})

const removeFromGroup = asyncHandler(async(req, res)=>{
    const{chatId, userId}=req.body;
    const removed = await Chat.findByIdAndUpdate(
        chatId,
          {$pull: {users: userId}},
          {new: true},
    ).populate("users","-password")
    .populate("groupAdmin","-password")

    if(!removed){
        res.send(404);
        throw new Error("Chat not found")
    }else{
        res.json(removed);
    }
})

module.exports = {accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup};