const express = require("express");
const { Router } = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const User = require("./models").user;

const app = express();
const jsonParser = express.json();
app.use(jsonParser);

// Registering the router to the app
app.use("/images", imageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

const port = 4000;
app.listen(port);
console.log(`listen at the port ${port}`);
