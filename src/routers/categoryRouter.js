const { categoryController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");
const uploader = require("../helper/uploader");

route.get("/getallcategory", categoryController.getAllCategory)
route.post("/addcategory", categoryController.addCategory)

module.exports = route;