const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    avatar :{
        public_id: {
            type: String,
          },
          url: {
            type: String,
          },
    },
    createdOn:{
        type: Date,
        default: Date.now,
    },
});
const User=mongoose.model("user",userSchema);
module.exports=User;