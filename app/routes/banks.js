"use strict";

var express = require("express");
var banksController = require("../controllers/banksController");

var router = express.Router();

router.get("/transfer_type", banksController.getTransfer);
router.get("/", banksController.getBanks);
router.get("/:id", banksController.getBanksById);

module.exports = router;