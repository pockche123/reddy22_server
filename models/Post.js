const db = require('../database/connect');

class Post {
  constructor({ post_id, user_id, title, content }) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
  }

  static async getAll() {
    const resp = await db.query('SELECT * FROM posts');
    return resp.rows.map((p) => new Post(p));
  }

  static async getOneById(id) {
    const resp = await db.query('SELECT * FROM posts WHERE post_id = $1', [id]);
    if (resp.rows.length !== 1) throw new Error('Unable to locate post.');
    return new Post(response.rows[0]);
  }

  static async create(data) {
    const { title, content, user_id } = data;
    let resp = await db.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING post_id;',
      [title, content, user_id]
    );
    const newId = resp.rows[0].post_id;
    const newPost = await Post.getOneById(newId);
    return newPost;
  }

  async destroy() {
    let resp = await db.query(
      'DELETE FROM posts WHERE post_id = $1 RETURNING *;',
      [this.id]
    );
    return new Post(resp.rows[0]);
  }
}

module.exports = Post;
