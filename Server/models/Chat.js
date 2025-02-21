const mongoose = require("mongoose");
const { Schema } = mongoose;

const userChatSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", userChatSchema);
module.exports = { Chat };
