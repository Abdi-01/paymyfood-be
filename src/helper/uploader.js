const multer = require('multer');
const fs = require('fs');

const uploader = (directory, filePreFix) => { // directory = alamat, prefix itu kode khusus untuk menggambarkan itu gambar apa
    // Define default directory storage
    let defaultDir = './src/public';

    // Multer Configuration 
    // 1. config storage location
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const storeDir = directory ? defaultDir + directory : defaultDir; // kalau parameter directory tidak ada akan langsung ke upload di folder public tanpa dibuatkan folder
            if (fs.existsSync(storeDir)) {
                console.log(`Directory ${storeDir} exist ✅`);
                cb(null, storeDir);
            } else {
                fs.mkdir(storeDir, { recursive: true }, (error) => { // recursive karena mkdir tdk bisa buat sub folder
                    if (error) {
                        console.log("error create directory : ", error);
                    }
                    cb(error, storeDir)

                })
            }
        },
        filename: (req, file, cb) => {
            console.log("cek original name", file.originalname);
            let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            console.log("check extension", ext);

            let newName = filePreFix + Date.now() + '.' + ext;
            console.log("New Name : ", newName);
            cb(null, newName);
        }
    });

    // 2. Config file filter 
    const fileFilter = (req,file,cb) => {
        const extFilter = /\.(jpg|jpeg|png|webp|avif)/;
        let checkExt = file.originalname.toLowerCase().match(extFilter);
        if(checkExt){
            cb(null, true);
        }else{
            cb(new Error("Your file extension denied"), false);
        }
    };

    // 3. Return multer
    return multer({storage, fileFilter})
}

module.exports = uploader;