const db = require('../database/connect');

class Post {
  constructor({
    post_id,
    user_id,
    title,
    content,
    date,
    iscommunity,
    enrolls
  }) {
    this.id = post_id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
    this.date = date;
    this.isCommunity = iscommunity;
    this.enrolls = enrolls;
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM posts ORDER BY date DESC');
    return response.rows.map((p) => new Post(p));
  }

  static async getAllCommunity() {
    const response = await db.query(
      'SELECT * FROM posts WHERE isCommunity IS TRUE'
    );
    return response.rows.map((p) => new Post(p));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM posts WHERE post_id = $1', [
      id
    ]);
    if (response.rows.length !== 1) {
      throw new Error('Unable to locate post.');
    }
    return new Post(response.rows[0]);
  }

  static async create(data) {
    const { title, content, user_id, iscommunity, enrolls } = data;
    let response = await db.query(
      'INSERT INTO posts (title, content, user_id, isCommunity, enrolls) VALUES ($1, $2, $3, $4, $5) RETURNING post_id;',
      [title, content, user_id, iscommunity, enrolls]
    );
    const newId = response.rows[0].post_id;
    const newPost = await Post.getOneById(newId);
    return newPost;
  }

  async updateCommunity(data) {
    let response = await db.query(
      'UPDATE posts SET enrolls = $1 WHERE id = $2 RETURNING id, enrolls;',
      [this.enrolls + parseInt(data.enrolls), this.id]
    );
    if (response.rows.length !== 1)
      throw new Error('Unable to update enrolls.');
    return new Snack(response.rows[0]);
  }

  async destroy() {
    let response = await db.query(
      'DELETE FROM posts WHERE post_id = $1 RETURNING *;',
      [this.id]
    );
    return new Post(response.rows[0]);
  }
}

module.exports = Post;
