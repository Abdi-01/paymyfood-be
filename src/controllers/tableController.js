const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const fs = require("fs");
let salt = bcrypt.genSaltSync(10);
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getAllTable: async (req, res, next) => {
        let get = await model.table.findAll({
            where: {
                isDeleted: false
            }
        })
        console.log("get all table ", get)
        res.status(200).send(get)
    },
    editTable: async (req, res, next) => {
        let edit = await model.table.update({
            table: req.body.table
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).send({
            success: true,
            message: 'Edit table success',
            data: edit
        })
    },
    deleteTable: async (req,res,next) => {
        let hapus = await model.table.update({
            isDeleted: true
        }, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).send({
            success: true,
            message: 'Delete Success',
            data: hapus
        })
    }, 
    addTable: async (req,res,next) => {
        let add = await model.table.create({
            table: req.body.table
        });
        console.log(add)
        res.status(200).send({
            success: true,
            message: 'add table success',
            data: add
        })

    }
}