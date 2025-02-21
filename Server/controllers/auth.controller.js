const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

async function signupForUser(req, res) {
  let success = false;
  const { name, username, email, password } = req.body;

  if (!(name && username && email && password)) {
    return res.status(400).json({
      msg: "All fields are required!",
    });
  }

  try {
    let user = await User.findOne({ $or: [{ email, username }] });
    if (user) {
      return res.status(400).json({
        success,
        error:
          "Sorry! a user already exists with this email, try using another email.",
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({
      username: username,
      name: name,
      email: email,
      password: hashedPassword,
    });

    const data = {
      user: {
        id: user.id,
        email,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.json({ success, authToken, msg: "User created successfully!" });
  } catch (err) {
    console.error("Error:"+ err.message);
    res
      .status(500)
      .json({ success: success, message: "Internal server error!" });
  }
}

async function signinForUser(req, res) {
  const { email, password } = req.body;
  let success = false;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({
        success,
        msg: "Please enter the correct email or create a new account!",
      });
    }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      success = false;
      return res
        .status(400)
        .json({ success, msg: "Please enter the correct password!" });
    }

    const data = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.json({ success, authToken, msg: "Login successful!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Internal server error!",
    });
  }
}

module.exports = { signupForUser, signinForUser };
