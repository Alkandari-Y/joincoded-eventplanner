const mongoose = require("mongoose");
const {userName, passWord, dbName} = require('./dbA')

//  

const mgn = `mongodb+srv://${userName}:${passWord}@${dbName}.wuuqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mgn, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
          });
          console.log(`mongo connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err)
    }
};
  
module.exports = connectDB;