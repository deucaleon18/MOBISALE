const mongoose=require("mongoose")


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 imageHash:{
   type:String,
   required:false
 },
 paymentAccount:{
   type:String,
   required:true
 },
 purchasedPosts:[{type:mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});



module.exports=mongoose.model("User",userSchema)