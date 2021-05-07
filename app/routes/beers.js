"use strict";

var express = require("express");
var beersController = require("../controllers/beersController");

var router = express.Router();

router.get("/", beersController.get);
router.get("/:id", beersController.getById);
router.delete("/:id", beersController.delete);
router.post("/", beersController.add);
router.put("/", beersController.update);

module.exports = router;