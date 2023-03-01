const { userController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");
const uploader = require("../helper/uploader");

route.post("/auth", userController.login);
route.get("/keeplogin", readToken, userController.keepLogin);
route.post("/addnewuser", userController.addNewUser);
route.get("/getalluser", userController.getAllUser);
route.post("/deleteuser", userController.deleteUser);
route.patch("/edituser", userController.editUser);

module.exports = route;
