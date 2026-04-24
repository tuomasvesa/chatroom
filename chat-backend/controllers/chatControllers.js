const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }).populate("users", "-password"); // populate the users (in chatModel) with user data, everything but password (so in this case just username)
  //.populate("latestMessage"); //this is if you add latestMessage to chatModel later. remove ; from upper row.

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "username pic",
  });

  if (isChat.len > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password",
      );

      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// for getting the specific users' chats. (in this first version everyone sees all the chats)
const fetchChats = asyncHandler(async (req, res) => {
  try {
    const chats = await Chat.find()
      .populate("users", "-password")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  // commented out tutorial code
  //   try {
  //     Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
  //       .populate("users", "-password")
  //       .sort({ updatedAt: -1 })
  //       .then(async (results) => {
  //         results = await User.populate(results, {
  //           path: "latestMessage.sender",
  //           select: "username pic",
  //         });

  //         res.status(200).send(results);
  //       });
  //   } catch (error) {
  //     res.status(400);
  //     throw new Error(error.message);
  //   }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.chatName) {
    // if the new chat doesnt have a name.
    return res.status(400).send({ message: "Please give the chat a name" });
  }

  // replace this with getting all the users
  var users = JSON.parse(req.body.users); // users that are invited/added to group

  //   if (users.length < 2) {
  //     return res
  //       .status(400)
  //       .send("More than 2 users are required to form a group chat");
  //   }

  users.push(req.user); // Add the current user to chat. Delete this later if all are added anyway?

  try {
    const groupChat = await Chat.create({
      chatName: req.body.chatName,
      users: users,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users",
      "-password",
    ); //.populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { accessChat, fetchChats, createGroupChat };
