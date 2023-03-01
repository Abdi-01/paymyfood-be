const { categoryController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");
const uploader = require("../helper/uploader");

route.get("/getallcategory", categoryController.getAllCategory)
route.post("/addcategory", categoryController.addCategory)
route.patch("/deletecategory", categoryController.deleteCategory)
route.patch("/editcategory", categoryController.editCategory)

module.exports = route;