const Project = require("../models/Project");
const path = require("path");
const fs = require("fs");

module.exports = {
  async show(req, res) {
    const { project_id } = req.params;

    try {
      const project = await Project.find({ _id: project_id });

      return res.json(project);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Ocorreu algum erro, tente novamente" });
    }
  },

  async index(req, res) {
    try {
      const response = await Project.find();

      return res.json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ocorreu algum erro, tente novamente" });
    }
  },

  async store(req, res) {
    const { title, techs, description, projectUrl } = req.body;
    const { filename } = req.file;

    const response = await Project.create({
      title,
      techs,
      thumbnail: filename,
      projectUrl,
      description,
    });

    return res.json(response);
  },

  async update(req, res) {
    const { project_id } = req.params;
    const { title, techs, description, projectUrl } = req.body;
    const { filename } = req.file;

    try {
      await Project.findByIdAndUpdate(
        { _id: project_id },
        {
          title,
          techs,
          thumbnail: filename,
          projectUrl,
          description,
        }
      );

      const project = await Project.findById({ _id: project_id });

      return res.json(project);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Ocorreu algum erro, tente novamente" });
    }
  },

  async destroy(req, res) {
    const { project_id } = req.params;

    try {
      const project = await Project.findById(project_id);

      if (!project) {
        return res
          .status(404)
          .json({ message: "Projeto não encontrado, tente novamente" });
      }

      fs.unlinkSync(
        path.resolve(__dirname, "..", "..", "uploads", `${project.thumbnail}`)
      );

      await Project.findByIdAndDelete(project._id);

      return res.json({ message: "Deletado com sucesso!" });
    } catch (err) {
      return res
        .status(404)
        .json({ message: "Ocorreu algum erro, tente novamente" });
    }
  },
};
