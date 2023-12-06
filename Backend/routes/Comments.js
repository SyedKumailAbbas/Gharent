const express = require('express')
const { Comment,User } = require('../models');
const { validatetoken } = require('../middleware/middleauth');

const router = express.Router();
router.post("/", validatetoken, async (req, res) => {
    try {
      const { CommentBody, pid } = req.body;
      const id = req.user.id;
  
      const createdComment = await Comment.create({
        Comment_Body: CommentBody,
        pid: pid,
        uid: id,
      });
  
      res.json({ data: createdComment });
    } catch (err) {
      console.error("Error adding comment:", err);
      res.status(403).json({ error: "Unauthorized: Only logged-in users can comment" });
    }
  });
  
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
        },
        include :[
          { model: User, attributes: ['username'], as: 'User' },
        ]
        
    });

    res.json(allcomments);
})
module.exports = router