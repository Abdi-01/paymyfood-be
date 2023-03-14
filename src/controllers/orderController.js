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
            const { start, end } = req.query
            console.log("req.queryyyy", req.query)
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
    },
    chart: async (req, res, next) => {
        try {
            endDate = new Date().toISOString().split('T')[0];
            let tgl = new Date() - 604800000
            let sevenDaysAgo = new Date(tgl).toISOString().split('T')[0];
            console.log("tgl 7 hari ke blkng", sevenDaysAgo);

            let tanggal = []
            let total = []
            let chart = await model.order.findAll({
                attributes: ['price', 'quantity', 'createdAt'],
                where: {
                    createdAt: {
                        [sequelize.Op.gte]: sevenDaysAgo,
                        [sequelize.Op.lte]: endDate
                    }
                }
            });
            for (let i = 0; i < chart.length; i++) {
                tanggal.push(chart[i].createdAt);
                total.push(chart[i].price * chart[i].quantity)
            }

            res.status(200).send({
                date: tanggal,
                total: total
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}