var express = require("express");
var router = express.Router();
var Game = require('../../../models').Game;

/* GET all games - INDEX */
router.get("/", function(req, res, next) {
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error});
    });
});

/* GET game - SHOW */
router.get("/:id", function(req, res, next) {
  Game.findAll({
      where: {
        id: req.params.id // request params access
      }
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error});
    });
});

/* POST game - CREATE */
router.post("/", function(req, res, next) {
  Game.create({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error});;
    });
});

/* PUT/PATCH game - UPDATE */
router.patch("/:id", function(req, res, next) {
  Game.update({
      title: req.body.title,
      price: req.body.price,
      releaseYear: req.body.releaseYear,
      active: req.body.active
    },
    {
      returning: true,
      where: {
        id: req.params.id
      }
    })
    .then(([rowsUpdated, [updatedGame]]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(202).send(JSON.stringify(updatedGame));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error});
    });
});

/* DELETE game - DESTROY */
router.delete("/:id", function(req, res, next) {
  console.log(req.params);
  Game.destroy({
      where: {
        id: req.params.id
      }
    })
    .then( game => {
      res.setHeader("Content-Type", "application/json");
      res.status(204).send();
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error});
    });
});

module.exports = router; //this should stay at the bottom of the file
