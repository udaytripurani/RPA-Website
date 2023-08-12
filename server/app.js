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
const path = require("path");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));




const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";



  const multer = require("multer");


 
  const mongoUrl = "mongodb://127.0.0.1:27017/local"; // Update with your local database URL
  
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to local database");
    })
    .catch((e) => console.log(e));
  const ImageDetailsSchema = new mongoose.Schema(
    {
      title: String,
      description: String,
      venue: String,
      date: String,
      image: String,
    },
    {
      collection: "ImageDetails",
    }
  );
  
  const Event = mongoose.model("ImageDetails", ImageDetailsSchema);
  
  var storage = multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage }).single("file");
  
  app.post("/upload-event", (req, res) => {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
  
      const { title, description, venue, date } = req.body;
      const imagePath = req.file ? req.file.filename : null;
  
      try {
        await Event.create({
          title,
          description,
          venue,
          date,
          image: imagePath,
        });
  
        res.send({ Status: "ok" });
      } catch (error) {
        res.send({ Status: "error", data: error });
      }
    });
  });
  
  app.use(express.static("./public"));

  app.get("/get-events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

require("./userDetails");
require("./eventSchema");



const User = mongoose.model("UserInfo");

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




// app.post("/upload-event", async (req, res) => {
//   const { title,description,venue,date, base64 } = req.body;
//   try {
//     await Event.create({ 
//       title,
//       description,
//       venue,
//       date,
//       posterImage: base64 });
//     res.send({ Status: "ok" })

//   } catch (error) {
//     res.send({ Status: "error", data: error });

//   }
// })

// app.use(express.static("./public"));


// var storage = multer.diskStorage({

// destination: "./public/images",
// filename: function (req, file, cb) {
// cb(null, Date.now() + '-' +file.originalname )
// }
// })



// var upload = multer({ storage: storage }).array('file');


// app.post('/upload',function(req, res) {
 
// upload(req, res, function (err) {
//        if (err instanceof multer.MulterError) {
//            return res.status(500).json(err)
//        } else if (err) {
//            return res.status(500).json(err)
//        }
//   return res.status(200).send(req.file)

// })

// });
////testing from here 



// const express = require("express");
// const mongoose = require("mongoose");
// const multer = require("multer");
// const cors = require("cors");
// const app = express();
// app.use(express.json());
// app.use(cors());
// const mongoUrl = "mongodb://127.0.0.1:27017/local"; // Update with your local database URL

// mongoose
//   .connect(mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to local database");
//   })
//   .catch((e) => console.log(e));
// const ImageDetailsSchema = new mongoose.Schema(
//   {
//     title: String,
//     description: String,
//     venue: String,
//     date: String,
//     image: String,
//   },
//   {
//     collection: "ImageDetails",
//   }
// );

// const Event = mongoose.model("ImageDetails", ImageDetailsSchema);

// var storage = multer.diskStorage({
//   destination: "./public/images",
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// var upload = multer({ storage: storage }).single("file");

// app.post("/upload-event", (req, res) => {
//   upload(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }

//     const { title, description, venue, date } = req.body;
//     const imagePath = req.file ? req.file.filename : null;

//     try {
//       await Event.create({
//         title,
//         description,
//         venue,
//         date,
//         image: imagePath,
//       });

//       res.send({ Status: "ok" });
//     } catch (error) {
//       res.send({ Status: "error", data: error });
//     }
//   });
// });

// app.use(express.static("./public"));

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
