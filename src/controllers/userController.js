const model = require("../models");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const fs = require("fs");
let salt = bcrypt.genSaltSync(10);

module.exports = {
    login: async (req, res, next) => {
        try {
            // console.log(bcrypt.hashSync(req.body.password, salt));
            let login = await model.users.findAll({
                where: {
                    email: req.body.email,
                },
            });
            console.log(login);
            if (login.length > 0) {
                let check = bcrypt.compareSync(
                    req.body.password,
                    login[0].dataValues.password
                );
                console.log(check);
                if (check) {
                    console.log("Check GET result:", login[0].dataValues);
                    let { uuid, username, email, roleId } = login[0].dataValues;
                    let token = createToken({ uuid });
                    return res.status(200).send({token, username, email, roleId});
                } else {
                    return res.status(400).send({
                        success: false,
                        message: "Wrong password",
                    });
                }
            } else {
                return res.status(400).send({
                    success: false,
                    message: "Wrong email or password",
                });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    keepLogin: async (req, res, next)=> {
        try {
            let get = await model.users.findAll({
                where: {
                    uuid: req.decript.uuid
                }
            })
            let ({uuid,username,email,roleId}) = get[0].dataValues
            let token = createToken({uuid})
            return res.status(200).send({token,username,email,roleId})
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};
