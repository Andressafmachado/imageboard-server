const express = require("express");
const { Router } = require("express");
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");

const app = express();
const jsonParser = express.json();
app.use(jsonParser);

app.use("/images", imageRouter);
app.use("/users", userRouter);

const port = 4000;
app.listen(port);
console.log(`listen at the port ${port}`);
