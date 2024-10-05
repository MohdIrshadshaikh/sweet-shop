const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loginpart")
    .then(() => {
        console.log("mongo connect")
    })
    .catch(() => {
        console.log("mongo not connect")
    })

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    profile:{
        type:String,
        default: "default.png"
    }
   
});

// const paySchema = new mongoose.Schema({
//     names: {
//         type: String,
//         require: true
//     },
    
//     emails: {
//         type: String,
//         require: true
//     },
    
//     passwords: {
//         type: String,
//         require: true
//     },
   
// });


const collection = new mongoose.model("collection1", loginSchema)

// const paycollection = new mongoose.model("collection2", paySchema)


module.exports = collection
// module.exports = paycollection

