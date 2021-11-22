const express = require("express");
const router = express.Router();
const Post = require("./../models/Post");

const bodyParser = require("body-parser");
const User = require("../models/User");
router.use(bodyParser.json());

router.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});




router.post("/create",async(req,res,next)=>{
  await new Post({
      username:req.body.username,
      postTitle:req.body.postTitle,
      postDescription:req.body.postDescription,
      postImageHash:req.body.postImageHash,
      cost:req.body.cost
  })
  .save()
  .then((posts)=>{
    console.log(posts)
    return res.json({message:"Post Successful",posts:posts})
    
  })
  .catch((err)=>{
    console.log(err)
    next()
  })

})






router.post("/sell/:id",async(req,res,next)=>{
  await Post.findByIdAndUpdate(req.params.id,{sold:true})
  .then(async(res)=>{
    console.log(res)
      await User.findOne({ username: req.params.username }).
      then(async(user)=>{
        console.log(user)
        console.log(user.purchasedPosts)
        console.log(req.params.id)
        let newPurchases=user.purchasedPosts
        newPurchases.push({post:req.params.id})
        console.log(newPurchases)
        await User.findOneAndUpdate({ username: req.params.username },{purchasedPosts:newPurchases})
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>{console.log(err)})
      })
      .catch((err)=>{console.log(err)})
  })
  .catch((err)=>{console.log(err)})
 
})






router.get("/",async(req,res,next)=>{
  await Post.find({sold:false})
  .then((posts)=>{
    console.log(posts);
    return res.json({posts:posts})
    })
    .catch((err)=>{
      console.log(err)
    })
})

router.get("/:id", async (req, res, next) => {
  await Post.findOne({_id:req.params.id})
    .then((posts) => {
      console.log(posts);
      return res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:username",async(req,res,next)=>{

  await Post.find({username:req.params.username})
  .then((posts)=>{
     console.log(posts);
    return res.json({posts:posts})
   
  })
  .catch((err)=>{
    console.log(err);
    return res.json({err:err})
  })

})






module.exports = router;