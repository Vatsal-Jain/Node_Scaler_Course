const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/testDatabase').then(() =>{
    console.log("connection established successfully")
}).catch((error) =>{
    console.log("coudnlt no connect ti mongodb",error)
})


