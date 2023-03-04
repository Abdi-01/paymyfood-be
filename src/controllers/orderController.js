const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const fs = require("fs");
let salt = bcrypt.genSaltSync(10);
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getIncomeToday: async (req, res, next) => {
        try {

            // let get = await model.order.findAll({
            //     attributes: [sequelize.fn("SUM", sequelize.col("price"))],
            //     raw: true,
            //     where: { createdAt: req.body.createdAt }
            // });

            const today = new Date().toISOString().split('T')[0]
            const { start, end } = req.query
            console.log("req.queryyyy",req.query)
            // if (!start) {
            //     start = today
            // }
            // if (!end) {
            //     end = today
            // }
            let get = await model.order.sum('price', {
                where: {
                    createdAt: { [sequelize.Op.between]: [start, end] }
                }
            });
            console.log(get)
            res.status(200).send({
                incomeToday: get
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}