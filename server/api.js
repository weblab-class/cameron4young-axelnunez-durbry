/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Canvas = require("./models/canvas");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const canvas = require("./models/canvas");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user){
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// Makes a new canvas
router.post("/canvas", (req, res) => {
  console.log(req.body);
  const newCanvas = new Canvas({
    name: req.body.name,
    moderators: req.body.moderators,
    // location: req.body.location,
    pixels: req.body.pixels,
    visitors: req.body.visitors
  });
  newCanvas.save().then((canvas) => res.send(canvas));
});

// Updates a pixel 
router.put('/canvas', async(req, res) => {
  const requestData = req.body;
  const updatedCanvas = await Canvas.findOneAndUpdate(
      {_id: req.body._id}, requestData
  );
  res.json({ success: true, updatedCanvas });
})


router.put('/user', async(req, res) => {
  const requestData = req.body;
  const updatedUser = await User.findOneAndUpdate(
      {googleid: req.body.googleid}, requestData
  );
  res.json({ success: true, updatedUser });
})

// Retrieves a canvas using name
router.get("/canvas/:canvas_name", async(req, res) => {
  Canvas.find({name : req.params.canvas_name}).then((canvas) => res.send(JSON.stringify(canvas[0])));
});

// Retrieves a canvas using name
router.get("/all/canvas", async(req, res) => {
  try {
    const data = await Canvas.find().sort({ visitors: -1 });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Retrieves a canvas using id
router.get("/canvas/id/:canvas_id", async(req, res) => {
  Canvas.find({_id : req.params.canvas_id}).then((canvas) => res.send(JSON.stringify(canvas[0])));
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged ins
  if (req.user){
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  }
  res.send({});
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
