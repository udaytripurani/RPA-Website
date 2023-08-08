const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
 // Add this line
 app.use(express.json({ limit: '10mb' }))

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));

const multer = require("multer");
const upload = multer({ dest: "uploads/" }).single("posterImage");


const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://uday:uday2acc@cluster0.0vtstih.mongodb.net/?retryWrites=true&w=majority";
  
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
require("./eventSchema");
require("./imageDetails");

const Images = mongoose.model("ImageDetails");
const User = mongoose.model("UserInfo");
const Event = mongoose.model("EventDetails");
app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/upload-image", async (req, res) => {
  const { title,description,venue,date,base64 } = req.body;
  try {
    await Images.create({ title,description,venue,date,image: base64 });
    res.send({ Status: "ok" })

  } catch (error) {
    res.send({ Status: "error", data: error });

  }
})



app.post("/userData",async(req,res)=>{

const {token} =req.body;
try{
  const user= jwt.verify(token,JWT_SECRET);
  const useremail=user.email;
  User.findOne({email:useremail})
  .then((data)=>{
    res.send({status:"ok",data:data});
  })
.catch((error)=>{
  res.send({status:'error',data:error});
});
}catch(error){}

});








app.listen(5000, () => {
  console.log("Server Started");
});



app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    User.deleteOne({ _id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});


app.post("/upload-event1", async (req, res) => {
  try {
    const { title, description, venue, date } = req.body;
    const event = new Event({ title, description, venue, date });
    
    // Assuming you have a field named 'posterImage' in your form
    // Multer middleware handles file uploads
    const upload = multer({ dest: "uploads/" }).single("posterImage");
    
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Image upload failed" });
      }
      
      event.posterImage = req.file ? req.file.filename : null;
      
      await event.save();
      return res.json({ status: "ok" });
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Event creation failed" });
  }
});


app.post("/upload-event", async (req, res) => {
  const { title,description,venue,date, base64 } = req.body;
  try {
    await Event.create({ 
      title,
      description,
      venue,
      date,
      posterImage: base64 });
    res.send({ Status: "ok" })

  } catch (error) {
    res.send({ Status: "error", data: error });

  }
})