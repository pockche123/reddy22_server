const Post = require('../models/Post');
const Token = require('../models/Token');
const User = require('../models/User');

const index = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const userToken = req.headers['authorization'];
    const token = await Token.getOneByToken(userToken);

    const result = await Post.create({ ...data, user_id: token.user_id });
    res.status(201).send(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await Post.getOneById(id);
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userToken = req.headers['authorization'];
    const token = await Token.getOneByToken(userToken);
    const user = await User.getOneById(token.user_id);

    const post = await Post.getOneById(id);

    if (post.user_id === user.id || user.isAdmin) {
      const result = await post.destroy();
      res.status(204).end();
    } else {
      res.status(403).json({
        error: 'You must be an admin or the post author to delete the post!'
      });
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

module.exports = {
  index,
  create,
  show,
  destroy
};
