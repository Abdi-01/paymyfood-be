const { check, validationResult } = require('express-validator');

// middleware validator untuk memeriksa request body , params, query, dll
module.exports = {
    checkUser: async (req, res, next) => {
        try {
            console.log("req path : ", req.path);
            if (req.path == '/register') { // yang di cek adalah url paling belakang
                await check("username").notEmpty().isAlphanumeric().run(req);
                await check("email").notEmpty().isEmail().run(req);
                // await check("phone").notEmpty().isMobilePhone().run(req);
            } else if (req.path == '/auth') {
                // await check("username").optional({ nullable: true }).isAlphanumeric().run(req);
                await check("email").optional({ nullable: true }).isEmail().run(req);
                // await check("phone").optional({ nullable: true }).isMobilePhone().run(req);
            } else if (req.path == '/forgot'){
                await check("email").notEmpty().isEmail().run(req);
            }
            await check("password").notEmpty().isStrongPassword({ // parameternya harus di isi semua biar tidak error
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0
            }).withMessage('Your password is to short / requirement are not met') // custom message error
                .run(req);

            const validation = validationResult(req); // untuk mengecek apakah ada yang terpenuhi apa tidak 
            console.log("Validation result : ", validation);
            if (validation.isEmpty()) { // jika variable validation kosong dan tidak ada error lanjut ke middleware selanjutnya
                next()
            } else {
                return res.status(400).send({
                    success: false,
                    message: 'Validation Invalid',
                    error: validation.errors
                })
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}