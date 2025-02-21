const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/user");
const connectToMongo = require("./db.js");
const userQueryRouter = require("./routes/bot");
require("dotenv").config();

connectToMongo();

const app = express();
const PORT = process.env.PORT || 5000;
// const corsOptions = {
//   origin: "https://medvisor.vercel.app",
//   credentials: true,
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

app.use(cors())
app.use(bodyParser.json());

app.use("/api/user", authRouter);
app.use("/api/bot", userQueryRouter);

app.use((req, res, next) => {
  res.status(404).json({
    msg: "404 Page not found!",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
