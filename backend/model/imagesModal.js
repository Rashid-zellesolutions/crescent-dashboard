const mongoose = require('mongoose')

const imgSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String,
    }
})

var ImageUpoad = mongoose.model("ImageUpload",imgSchema);