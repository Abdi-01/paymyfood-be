const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const fs = require("fs");
let salt = bcrypt.genSaltSync(10);
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getAllCategory: async (req, res, next) => {
        let get = await model.category.findAll({
            where: {
                isDeleted: false
            }
        })
        console.log("get all category", get)
        return res.status(200).send(get)
    },
    addCategory: async (req, res, next) => {
        let tambah = await model.category.create({
            category: req.body.category
        })
        console.log("add category", tambah)
        return res.status(200).send({
            success: true,
            message: 'Add category success',
            data: tambah
        })
    },
    deleteCategory: async (req, res, next) => {
        try {
            let hapus = await model.category.update({
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
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    editCategory: async (req, res, next) => {
        try {
            let edit = await model.category.update({
                category: req.body.category
            }, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).send({
                success: true,
                message: "Edit category success",
                data: edit
            })

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}