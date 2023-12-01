require('dotenv').config()
const express = require('express');
const db = require('./models');
const cors = require('cors');
const postRouter = require('./routes/Posts');
const commentRouter = require('./routes/Comments');
const authRouter = require(`./routes/Auth`);
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;








// Move the server listen and routes setup inside the Sequelize sync callback
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Your app is live on port: ${PORT}`);
    });

    // Define a simple root route
    app.get("/", (req, res) => {
      console.log('Hello profile');
      res.send("This is profile " + new Date());
    });

    // Define your API routes
    app.use("/posts", postRouter);
    app.use("/comments", commentRouter);
    app.use("/auth", authRouter);

  })
  .catch((error) => {
    console.error('Database synchronization error:', error);
  });