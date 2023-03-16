const { orderController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");
const uploader = require("../helper/uploader");

route.get('/income', orderController.getIncomeToday)
route.get('/chart', orderController.chart)


module.exports = route