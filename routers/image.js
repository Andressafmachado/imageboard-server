const express = require("express");
const Image = require("../models").image;
const { Router } = express;

const router = new Router();

// SEE ALL IMAGES
// router.get("/", async (request, response, next) => {
//   try {
//     console.log("Im getting all images");
//     const images = await Image.findAll();
//     response.send(images);
//   } catch (e) {
//     next(e);
//   }
// });

//PAGINATION
//http :4000/images offset==0 limit==2
router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 500);
  const offset = req.query.offset || 0;
  try {
    const result = await Image.findAndCountAll({ limit, offset });
    res.send({ images: result.rows, total: result.count });
  } catch (error) {
    next(error);
  }
});

//Create a new image
//http POST :4000/images title="firstimage" url="https://tse1.mm.bing.net/th\?id\=OIP.yiJspE2FqIM-N0-i5MeSBgHaEK\&pid\=Api"
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

//GET an image by id
//OPEN AT THE BROWSER localhost:4000/images/id
router.get("/:imageId", async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.imageId);
    const image = await Image.findByPk(imageId);
    if (!image) {
      res.status(404).send("image not found");
    } else {
      res.send(image);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
