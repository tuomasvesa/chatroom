//chatName
//users


const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AppUser",
            }
        ],
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

modeule.exports = Chat;