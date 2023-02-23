const jwt = require('jsonwebtoken');

module.exports = {
    createToken: (payload, exp = '24h') => jwt.sign(payload, '1234567890', { expiresIn: exp }),
    readToken: (req, res, next) => { // middleware kedua untuk membaca tokennya / menterjemahkan
        jwt.verify(req.token, '1234567890', (error, decript) => {
            if (error) {
                return res.status(401).send({
                    success: false,
                    message: 'Authenticate failed'
                })
            }
            req.decript = decript; // menambahkan properti baru ke dalam req 
            next(); // untuk melanjutkan ke middleware berikutnya
        });
    }
}