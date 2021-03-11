const express = require("express");
const Image = require("../models").image;
const { Router } = express;

const router = new Router();

router.get("/", async (request, response, next) => {
  try {
    console.log("Im getting all images");
    const images = await Image.findAll();
    response.send(images);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const title = req.body.title;
    const url = req.body.url;
    if (!title || title === " " || !url || url === " ") {
      res.status(400).send("Must provide title and url");
    } else {
      const image = await Image.create(req.body);
      res.json(image);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
