const mongoose = require("mongoose");
const { Schema } = mongoose;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    chatHistory: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  },
  { timestamps: true }
);

userSchema.plugin(aggregatePaginate);
const User = mongoose.model("User", userSchema);

module.exports = User;
