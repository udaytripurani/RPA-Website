const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
    title:String,
    description:String,
    venue:String,
    date:String,
   image:String
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", ImageDetailsScehma);