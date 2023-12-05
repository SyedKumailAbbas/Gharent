const express = require('express')
const { Comment } = require('../models');
const { validatetoken } = require('../middleware/middleauth');

const router = express.Router();

router.post("/", validatetoken, async (req, res) => {  //creating comment and add it into db
    try {
        const [CommentBody, postid] = req.body;
        const id=req.user.id
        console.log("Received token:", req.headers.token);
        const validToken = verify(req.headers.token, "hellojani");
        console.log("Token verification details:", validToken);

        await Comment.create({
            Comment_Body: CommentBody,
            pid: postid,
            id:id,
        })
        res.json(cmnt);
    }
    catch (err) {
        res.status(403).json({ error: "Unauthorized: Only logged-in users can comment" });
    }

})

router.delete("/:commentId", validatetoken, async (req, res) => {
    const commentId = req.params.commentId;
  
    await Comment.destroy({
      where: {
        id: commentId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });


router.get(`/:postid`, async (req, res) => {  //viewing all comments from the db
    const postid = req.params.postid;
    // res.send("all comments are here")
    const allcomments = await Comment.findAll({
        where: {
            pid: postid
        }
    });

    res.json(allcomments);
})
module.exports = router