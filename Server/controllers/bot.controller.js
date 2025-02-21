const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Chat } = require("../models/Chat.js");
const User = require("../models/User.js");
const mongoose = require("mongoose");

async function queryChatbot(req, res) {
  const userMessage = req.body.message;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    maxOutputTokens: 50,
  });

  try {
    const prompt =
      "Assume your name is Medvisor and you are an expert in Fitness and Healthcare.\n" +
      userMessage;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = response.text();

    // save the user message and response to the database
    const userChatData = await Chat.create({
      role: "You",
      content: userMessage,
    });

    const aiChatData = await Chat.create({
      role: "Medvisor",
      content: data,
    });

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { chatHistory: { $each: [userChatData._id, aiChatData._id] } },
      },
      { new: true }
    );

    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Internal server!",
    });
  }
}

async function getUserChatHistory(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(userId),
        },
      },
      {
        $lookup: {
          from: "chats",
          localField: "chatHistory",
          foreignField: "_id",
          as: "chatHistory",
        },
      },
      { $project: { chatHistory: 1 } },
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const chatHistory = user[0].chatHistory;

    if (!chatHistory || chatHistory.length === 0) {
      return res.status(404).json({ msg: "No chat history found!" });
    }

    return res.status(200).json({
      data: chatHistory,
      msg: "Chat History fetched successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error while fetching chat data!",
    });
  }
}
module.exports = { queryChatbot, getUserChatHistory };
