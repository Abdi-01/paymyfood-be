const { productController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");
const uploader = require("../helper/uploader");

route.get("/getallproduct", productController.getAllProducts)
route.patch("/deleteproduct", productController.deleteProduct)
route.patch("/editproduct/:uuid", readToken, uploader('/imgProduct', 'PRD').array('images', 1), productController.editProduct)
route.post("/addproduct", readToken, uploader('/imgProduct', 'PRD').array('images', 1), productController.addProduct)
route.post("/list", productController.list)
route.get("/bestseller", productController.bestSeller)

module.exports = route;