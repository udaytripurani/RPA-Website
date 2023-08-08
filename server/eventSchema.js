const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    venue: String,
    date: String,
    posterImage: String, // You can choose the appropriate type for image storage
  },
  {
    collection: "EventDetails",
  }
);

mongoose.model("EventDetails", EventSchema);
