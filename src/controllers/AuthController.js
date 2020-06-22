const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth");

const User = require("../models/User");

module.exports = {
  async register(req, res) {
    const { email } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: "Usuário existente" });
      }

      const user = await User.create(req.body);

      user.password = undefined;

      res.json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu algum erro, tente novamente" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Email ou Senha inválida" });
    }

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    res.json({ user, token });
  },

  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async authenticated(req, res) {
    return res.send({ auth: true });
  },
};
