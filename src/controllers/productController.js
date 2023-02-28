const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const fs = require("fs");
let salt = bcrypt.genSaltSync(10);
const { v4: uuidv4 } = require('uuid')

module.exports = {
    getAllProducts: async (req, res, next) => {
        let get = await model.product.findAll({
            attributes: { exclude: ['id'] },
            include: [{ model: model.category, attributes: ['category'] }],
            where: {
                isDeleted: false
            }
        })
        console.log("get all products", get)
        res.status(200).send(get)
    },
    deleteProduct: async (req, res, next) => {
        let hapus = await model.product.update({
            isDeleted: true
        }, {
            where: {
                uuid: req.body.uuid
            }
        });
        res.status(200).send({
            success: true,
            message: 'Delete Success',
            data: hapus
        })
    },
    editProduct: async (req, res, next) => {
        try {
            let get = await model.product.findAll({
                where: { uuid: req.params.uuid },
                attributes: ['image']
            });

            console.log("req.body.data : ", req.body.data);
            console.log("req.files  : ", req.files);
            let { product, price, category } = JSON.parse(req.body.data)
            if (req.files.length == 0) {
                let edit = await model.product.update({
                    product,
                    price,
                    categoryId: category
                }, {
                    where: {
                        uuid: req.params.uuid
                    }
                });
                return res.status(200).send({
                    success: true,
                    message: 'Edit Product success'
                })
            } else {
                let edit = await model.product.update({
                    product,
                    price,
                    categoryId: category,
                    image: `/imgProduct/${req.files[0]?.filename}`
                }, {
                    where: {
                        uuid: req.params.uuid
                    }
                });

                if (fs.existsSync(`./src/public${get[0].dataValues.image}`) && !get[0].dataValues.image.includes('default')) {
                    fs.unlinkSync(`./src/public${get[0].dataValues.image}`);
                }
                
            }
            return res.status(200).send({
                success: true,
                message: 'Edit Product success'
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    addProduct: async (req,res,next) => {
        try {
            console.log("req.body.data : ", req.body.data);
            console.log("req.files  : ", req.files);
            let { product, price, category } = JSON.parse(req.body.data)
            if (req.files.length == 0) {
                let tambah = await model.product.create({
                    uuid: uuidv4(),
                    product,
                    price,
                    categoryId: category
                });
                return res.status(200).send({
                    success: true,
                    message: 'Add Product success'
                })
            } else {
                let tambah = await model.product.create({
                    uuid: uuidv4(),
                    product,
                    price,
                    categoryId: category,
                    image: `/imgProduct/${req.files[0]?.filename}`
                });
            }
            return res.status(200).send({
                success: true,
                message: 'Add Product success'
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}