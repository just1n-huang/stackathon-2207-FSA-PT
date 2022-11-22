const express = require("express");
const app = express.Router();
const { Fave } = require("../db");

module.exports = app;

app.get("/", async (req, res, next) => {
  const fave = await Fave.findAll();
  res.send(fave);
});

app.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Fave.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/faves/:id", async (req, res, next) => {
  const fave = await Fave.findByPk(req.params.id);
  await fave.destroy();
  res.sendStatus(204);
});
