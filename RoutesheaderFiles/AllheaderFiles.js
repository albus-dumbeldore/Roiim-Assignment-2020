var express         = require("express");
var router          = express.Router();
var CustomerID      = require('../models/consumerid.js')
var request         = require('request');
const bodyParser    = require("body-parser")


module.exports = {express,router,CustomerID,request,bodyParser}