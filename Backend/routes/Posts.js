const express = require('express');
const { Post, Location, Description, Image,User } = require('../models');
const cloudinary = require('cloudinary')
const multer = require('multer')
const router = express.Router();
const jwt = require('jsonwebtoken')
const {validatetoken} = require('../middleware/middleauth');
const { Op } = require('sequelize');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

// adding post on database
router.post("/", validatetoken, upload.array('images', 10), async (req, res) => {
  try {

    const id = req.user.id
    // Create records in the database with associations
    const post = await Post.create({
      Title: req.body.Title,
      Price: req.body.Price,
      Status: req.body.status,
      uid:id,
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
      category: req.body.category,

    });

   const images = req.files; // Array of images
    const uploadedImages = [];

    for (const file of images) {
      const base64String = file.buffer.toString('base64');
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64String}`, {
        folder: 'Images',
      });
      const imageRecord = await Image.create({
        imageurl: result.secure_url,
        pid: post.pid,
      });
      uploadedImages.push(imageRecord);
    }

    console.log("Record created successfully");
    res.status(200).json({ success: true, post: post, images: uploadedImages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


//getting all post
router.get("/", async (req, res) => {
  try {
    // Fetch all posts with associated location, description, and image
    const allPosts = await Post.findAll({
      include: [
        { model: Location, as: 'Location' },
        { model: Description, as: 'Description' },
        { model: Image, as: 'Images' }, // Correct alias 'Images'
        { model: User, attributes: ['username'], as: 'User' },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!allPosts || allPosts.length === 0) {
      return res.json({ success: true, posts: [] });
    }

    try {
      const simplifiedPosts = allPosts.map(post => ({
        pid: post.pid,
        Title: post.Title,
        Price: post.Price,
        Status: post.Status,
        createdAt: post.createdAt,
        uid: post.uid,
        location: post.Location,
        description: post.Description,
        user: post.User,
        images: post.Images.map(image => image.imageurl),
      }));

      res.status(200).json({ success: true, posts: simplifiedPosts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});




//getting post by id
router.get(`/byid/:id`, async (req, res) => {
  try{
  const pid = req.params.id
  const post = await Post.findByPk(pid,{
    include: [
      { model: Location, as: 'Location' },
      { model: Description, as: 'Description' },
      { model: Image, as: 'Images' }, // Correct alias 'Images'
      { model: User, attributes: ['username'], as: 'User' },
    ],
    order: [['createdAt', 'DESC']],
  });

  if (!post || post.length === 0) {
    return res.json({ success: true, posts: [] });
  }

  try {
    const simplifiedPosts = {
      pid: post.pid,
      Title: post.Title,
      Price: post.Price,
      Status: post.Status,
      createdAt: post.createdAt,
      uid: post.uid,
      location: post.Location,
      description: post.Description,
      user: post.User,
      images: post.Images.map(image => image.imageurl),
    }

    res.status(200).json({ success: true, posts: simplifiedPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
} catch (err) {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
}
})
//deleting
router.delete(`/:postId`, validatetoken, async (req, res) => {
  const postId = req.params.postId;
  await Post.destroy({
    where: {
      pid: postId,
    },
  });

})

//getting own post
router.get(`/profile`,validatetoken, async(req,res)=>{
  const id =req.user.id
  const posts = await Post.findAndCountAll({
    where: {
      uid: id
  },
  include: [
    {
      model: Location, as: Location
    },
    {
      model: Description, as:Description,
    },
    {
      model: Image, as : Image
    }
  ],
})
if (!posts || posts.length === 0) {
  return res.json({ success: true, posts: [] });
}

try {
  const simplifiedPosts = {
    pid: posts.pid,
    Title: posts.Title,
    Price: posts.Price,
    Status: posts.Status,
    createdAt: posts.createdAt,
    uid: posts.uid,
    location: posts.Location,
    description: posts.Description,
    user: posts.User,
    images: posts.Images.map(image => image.imageurl),
  }

  res.status(200).json({ success: true, posts: simplifiedPosts });
} catch (err) {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
}
})



  // getting post when user search by title
  router.get(`/search/:value`, async (req, res) => {

    const searchValue = req.params.value.toLowerCase();
  
    const { rows: posts, count } = await Post.findAndCountAll({
      where: {
        Title: {
          [Op.like]: `%${searchValue}%`,
        },
      },
      include: [
        {
          model: Location, as: Location
        },
        {
          model: Description, as: Description,
        },
        {
          model: Image, as: Image
        }
      ],
    });
  
    if (!posts || count === 0) {
      return res.json({ success: true, posts: [] });
    }
  
    try {
      const simplifiedPosts = {
        pid: posts[0].pid,
        Title: posts[0].Title,
        Price: posts[0].Price,
        Status: posts[0].Status,
        createdAt: posts[0].createdAt,
        uid: posts[0].uid,
        location: posts[0].Location,
        description: posts[0].Description,
        user: posts[0].User,
        images: posts[0].Images.map(image => image.imageurl),
      }
  
      res.status(200).json({ success: true, posts: simplifiedPosts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  
  router.get("/filter-posts", async (req, res) => {
    try {
      const { bedrooms, bathrooms, category, location } = req.query;
      let whereClause = {};
      console.log("Location input from user:", location);
      if (bedrooms) {
        whereClause['$Description.bed$'] = bedrooms;
      }
      if (bathrooms) {
        whereClause['$Description.bath$'] = bathrooms;
      }
      if (category && typeof category === 'string' && category.length) {
        whereClause['$Description.category$'] = {
          [Op.in]: category.split(',')
        };
      }
  
      let locationWhereClause = {};
      if (location && typeof location === 'string' && location.length) {
        const citiesArray = location.split(',');
        locationWhereClause = {
          city: { [Op.in]: citiesArray }
        };
      }
  
      const filteredPosts = await Post.findAll({
        include: [
          {
            model: Location,
            as: 'Location',
            attributes: ['city'],
            where: locationWhereClause, // Apply the location filter here
            required: location ? true : false // Enforce an inner join only if location filter is provided
          },
          {
            model: Description,
            as: 'Description',
            attributes: ['bed', 'bath', 'category'],
          },
          {
            model: Image,
            as: 'Images',
          },
        ],
        where: whereClause,
        order: [['createdAt', 'DESC']],
      });
  
      res.status(200).json({ success: true, posts: filteredPosts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });



module.exports = router;