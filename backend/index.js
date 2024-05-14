const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const ImageUpload = require('./model/imagesModal')

// const DB_URI = 'mongodb://localhost:27017/eden-garden-dashboard';
const DB_URI = "mongodb+srv://rashidalizellesolutions:Sniper+122@mycluster.v4cfzgl.mongodb.net/eden-garden-dashboard"

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect(DB_URI).then(() => {console.log("Connected")}).catch((e) => {console.log(e.message)});


const insuredRoute = require('./routes/insuredPersonsRoutes');
app.use('/api/v1', insuredRoute);


const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        return cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})


const uploads = multer({storage});

app.post('/uploads', uploads.single('file'), (req, res) => {
    let img = req.file.path;
    let encoded_img = img.toString('base64');
    let finalImage = {
        contentType: req.file.mimetype,
        image: new Buffer(encoded_img, 'base64')
    }
    ImageUploade.create(finalImage, function(err, result){
        if(err){
            console.log(err)
        }else{
            console.log(result.img.Buffer);
            console.log("Image Stored in database");
            res.contentType(finalImage.contentType)
            res.send(finalImage.img)
        }
    })
    console.log(encoded_img)
    
})


// app.post('/uploads', uploads.single('uplaodImages'), function (req, res) {
//     console.log(req.body)
//     console.log(req.file)
// })


app.listen(5000, () => {console.log("app is listening at port 5000")});
