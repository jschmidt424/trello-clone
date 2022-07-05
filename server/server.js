const dotenv = require("dotenv");
const express = require("express");
const unless = require("express-unless");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./Routes/userRoute");
const auth = require("./Middlewares/auth");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// auth verification
auth.verifyToken.unless = unless;

app.use(
  auth.verifyToken.unless({
    path: [
      { url: "/user/login", methods: ["POST"] },
      { url: "/user/register", methods: ["POST"] },
    ],
  })
);

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database connection failed!");
    console.log(`Details : ${err}`);
  });

// Routes
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
