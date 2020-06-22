const mongoose = require("mongoose");
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
  return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Project", ProjectSchema);
