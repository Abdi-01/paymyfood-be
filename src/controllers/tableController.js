const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const fs = require("fs");
let salt = bcrypt.genSaltSync(10);
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getAllTable: async (req, res, next) => {
        let get = await model.table.findAll()
        console.log("get all table ", get)
        res.status(200).send(get)
    },
    editTable: async (req, res, next) => {

    },
    deleteTable: async (req,res,next) => {

    }
}