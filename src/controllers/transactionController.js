const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const fs = require("fs");
let salt = bcrypt.genSaltSync(10);
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createTransaction: async (req, res, next) => {
        let get = await model.users.findAll({
            where: {
                uuid: req.decript.uuid
            }
        })
        console.log("iiiiiddddd",get[0].dataValues.id)
        console.log("props order data cart",req.body.order)
        let transaksi = await model.transaction.create({
            userId: get[0].dataValues.id,
            tableId: req.body.tableId
        });
        console.log("output transaksi",transaksi.dataValues.id) // transactionId

        let newArr = req.body.order.map((val, idx) => {
            delete val.uuid
            delete val.product
            delete val.image
            return {...val, transactionId: transaksi.dataValues.id};
        })

        console.log("newww arrr transaction", newArr)

        let order = await model.order.bulkCreate(newArr)

        
    }
}