"use strict";

var express = require("express");
var destinatarioController = require("../controllers/destinatarioController");

var router = express.Router();

router.get("/:name", destinatarioController.getByName);
router.post("/", destinatarioController.add);

module.exports = router;