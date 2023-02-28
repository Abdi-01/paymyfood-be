const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const fs = require("fs");
let salt = bcrypt.genSaltSync(10);
const { v4: uuidv4 } = require('uuid')

module.exports = {
    login: async (req, res, next) => {
        try {
            // console.log(bcrypt.hashSync(req.body.password, salt));
            let login = await model.users.findAll({
                where: {
                    email: req.body.email,
                },
            });
            console.log("ini logiinnn",login);
            if (login.length > 0) {
                if(login[0].dataValues.isDeleted){
                    return res.status(400).send({
                        success: false,
                        message: 'Account has been deleted'
                    })
                } else {
                    let check = bcrypt.compareSync(
                        req.body.password,
                        login[0].dataValues.password
                    );
                    console.log(check);
                    if (check) {
                        console.log("Check GET result:", login[0].dataValues);
                        let { uuid, username, email, roleId } = login[0].dataValues;
                        let token = createToken({ uuid });
                        return res.status(200).send({ token, username, email, roleId });
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: "Wrong password",
                        });
                    }
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Account not found",
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    keepLogin: async (req, res, next) => {
        try {
            let get = await model.users.findAll({
                where: {
                    uuid: req.decript.uuid
                }
            })
            let { uuid, username, email, roleId } = get[0].dataValues
            let token = createToken({ uuid })
            return res.status(200).send({ token, username, email, roleId })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    addNewUser: async (req, res, next) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, salt)
            let add = await model.users.create({
                uuid: uuidv4(),
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                roleId: req.body.roleId
            });
            return res.status(200).send({
                success: true,
                message: 'registration success',
                data: add
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getAllUser: async (req, res, next) => {
        try {
            let get = await model.users.findAll({
                attributes: { exclude: ['password', 'uuid', 'id'] },
                where: {
                    isDeleted: false
                }
            });
            console.log(get);
            return res.status(200).send(get)
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            let hapus = await model.users.update({
                isDeleted: true
            }, {
                where: {
                    email: req.body.email
                }
            });
            console.log("hapuss", hapus)
            return res.status(200).send({
                success: true,
                message: 'delete success'
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    editUser: async (req, res, next) => {
        try {
            let edit = await model.users.update({
                username: req.body.username,
                roleId: req.body.roleId
            }, {
                where: {
                    email: req.body.email,
                }
            })
            return res.status(200).send({
                success: true,
                message: "Edit successful",
                data: edit
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
};
