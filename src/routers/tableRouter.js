const { tableController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");
const uploader = require("../helper/uploader");


route.get('/getalltable', tableController.getAllTable)
route.patch('/edittable', tableController.editTable)
route.get('/deletetable', tableController.deleteTable)


module.exports = route;