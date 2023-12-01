const express = require('express');
const { Post, Location, Description, Image, } = require('../models');
const cloudinary = require('cloudinary')
const multer = require('multer')
const router = express.Router();
const jwt = require('jsonwebtoken')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

// adding post on database
router.post("/", upload.single('image'), async (req, res) => {
  try {
    // Verify JWT token
    const token = req.headers['token'];
    const decodedToken = jwt.verify(token, "hellojani");
    // console.log(decodedToken)
    // console.log(token);
    console.log(req.headers)
    // Upload image to Cloudinary
    const base64String = req.file.buffer.toString('base64');

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64String}`, {
      folder: 'Images',
    });
    const imageUrl = result.secure_url;
    const publicid=result.public_id

    // Create records in the database with associations
    const post = await Post.create({
      Title: req.body.Title,
      Price: req.body.Price,
      Status: req.body.status,
    });

    const location = await Location.create({
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      state: req.body.state,
      zipcode: req.body.zipcode,
      pid: post.pid,

    });

    const description = await Description.create({
      desctxt:req.body.Description,
      bath: req.body.baths,
      bed: req.body.beds,
      area: req.body.area,
      pid: post.pid,

    });

    const image = await Image.create({
      imageurl: imageUrl,
      // Assuming you have an association between Image and Post
      pid: post.pid,
    });

    console.log("Record created successfully");
    res.status(200).json({ success: true, public_id: publicid });
    } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



//getting all post
router.get("/", async (req, res) => {
  try {
    // Fetch all posts with associated location, description, and image
    const allPosts = await Post.findAll({   //left outer join
      include: [
        { model: Location, as: 'Location' },
        { model: Description, as: 'Description' },
        { model: Image, as: 'Image' },
      ],
    });
    
    if (!allPosts) res.json("There are no post")

    // Send the data as a response
    res.status(200).json({ success: true, posts: allPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }


});


//getting post by id
router.get(`/byid/:id`, async (req, res) => {
  const pid = req.params.id
  const post = await Post.findByPk(pid)
 
  const location= await Location.findOne({
    where:{
      pid:pid
    },
  })
  const image= await Image.findOne({
    where:{
      pid:pid
    },
  })
  
  const description= await Description.findOne({
    where:{
      pid:pid
    },
  })
  const fullpost = { ...post.dataValues, ...location?.dataValues, ...image?.dataValues, ...description?.dataValues };
  res.json(fullpost)
})


module.exports = router;

//getting post when user search by title
// router.get(`/search/:value`,async(req,res)=>{
//   const title=req.params.value
//   const post = await Post.findAndCountAll({
//     where :{
//       Title:{
//         [Op.like]:`%${title}%`
//       }
//     }
//   })
//   res.json(post)
// })


