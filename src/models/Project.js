const path = require("path");
const mongoose = require("mongoose");
require("dotenv/config");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    techs: String,
    thumbnail: String,
    description: {
      type: String,
      required: true,
    },
    projectUrl: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.virtual("thumbnail_url").get(function () {
  return `${process.env.APP_URL}files/${this.thumbnail}`;
});

module.exports = mongoose.model("Project", ProjectSchema);
