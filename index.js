const express = require("express");
const { Router } = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const User = require("./models").user;
const port = 4000;
const authMiddleware = require("./auth/middleware");

const app = express();
// Middlewares
const jsonParser = express.json();
app.use(jsonParser);

// Registering the router to the app
//app.use("/images/auth/messy", authMiddleware, imageRouter);
app.use("/images", authMiddleware, imageRouter);
app.use("/users", userRouter);
app.use(authRouter);

// Start server
app.listen(port);
console.log(`listen at the port ${port}`);
