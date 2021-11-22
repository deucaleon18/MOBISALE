const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
  username:{
      type:String,
      required:true
  },
//   userSerial:{
//       type:Number,
//       required:true
//   },
  postTitle:{
      type:String,
      required:true
  },
  postDescription:{
      type:String,
      required:true
  },
//   features:[{type:String}],

  postImageHash:{
      type:String,
      
  },
  sold:{
      type:Boolean,
      default:false
  },
  cost:{
      type:Number,
      required:true
  }

})


module.exports = mongoose.model("Post",postSchema);