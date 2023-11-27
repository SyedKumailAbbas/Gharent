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
    // Upload image to Cloudinary
    const decodedToken = jwt.verify(token, "hellojani");
    console.log(decodedToken);
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'Images',
    });
    const { Title, Description, Price, beds, baths, country, state, city, address, zipcode, area, status } = req.body;
    const imageUrl = result.secure_url;
    const post = Post.create({
      Title: Title,
      Price: Price,
      Status:status
    })
    const location = Location.create({
      address: address,
      city:city,
      country:country,
      state:state,
      zipcode:zipcode
    })
    const description=description.create({
      bath:baths,
      bed:beds,
      area:area
    })
    console.log("hello post api");
  }
  catch (err) {


  }
});


//getting all post
router.get("/", async (req, res) => {
  const allpost = await Post.findAll({});
  res.json(allpost)

});


//getting post by id
router.get(`/byid/:id`, async (req, res) => {
  const [userid, title, price, status, imageid, descid, locationid] = req.body
  const pid = req.params.id
  const post = await Post.findByPk(pid)
  res.json(post)
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


