const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String || Number,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: String },
      },
    ],
    createdBy: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "users", // this is a reference to the users database
    },
  },

  { timestamps: true }
);

const Url = mongoose.model("url", urlSchema);

module.exports = Url;
