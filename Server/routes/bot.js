const express = require("express");
const router = express.Router();
const {
  queryChatbot,
  getUserChatHistory,
} = require("../controllers/bot.controller.js");
const fetchuser = require("../middleware/userauth.js");

router.post("/completions", fetchuser, queryChatbot);

router.get("/getchat", fetchuser, getUserChatHistory);

module.exports = router;
