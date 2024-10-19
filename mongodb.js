const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
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

