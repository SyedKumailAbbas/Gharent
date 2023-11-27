const express=require('express')
const {Comment}=require('../models');
const {validatetoken} = require('../middleware/middleauth');

const router = express.Router();

router.post("/", validatetoken, async (req, res) => {  //creating comment and add it into db
    try {const cmnt = req.body;
    await Comment.create(cmnt)
    res.json(cmnt);
    console.log("hello comment api")
    }
    catch(err){
        res.status(403).json({ error: "Unauthorized: Only logged-in users can comment" });
    }

})


router.get(`/:postid`,  async (req, res) => {  //viewing all comments from the db
    const postid = req.params.postid;
    // res.send("all comments are here")
    const allcomments=await Comment.findAll({
        where :{
            PostPid:postid
    }});

    res.json(allcomments);
})
module.exports=router