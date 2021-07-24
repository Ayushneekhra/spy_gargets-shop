const mongoose = require("mongoose");
require("colors");
const connectDb = async () => {
  try {
    const ur = 'mongodb+srv://ayush:ayush@cluster0.onvu6.mongodb.net/mern12?retryWrites=true&w=majority';
    const con = await mongoose.connect(ur,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true,
    });
    console.log(`conect successfully${con.connection.host}`);
} catch (error) {
    console.log(error)   
 
}  
 
}; 

module.exports = connectDb;
