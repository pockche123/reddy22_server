const { v4: uuidv4 } = require('uuid');

const db = require('../database/connect');

class Token {
  constructor({ token_id, user_id, token }) {
    this.token_id = token_id;
    this.user_id = user_id;
    this.token = token;
  }

  static async create(user_id) {
    const token = uuidv4();
    const resp = await db.query(
      'INSERT INTO tokens (user_id, token) VALUES ($1, $2) RETURNING token_id;',
      [user_id, token]
    );
    const newId = resp.rows[0].token_id;
    const newToken = await Token.getOneById(newId);
    return newToken;
  }

  static async getOneById(id) {
    const resp = await db.query('SELECT * FROM tokens WHERE token_id = $1', [
      id
    ]);
    if (resp.rows.length !== 1) {
      throw new Error('Unable to locate token.');
    } else {
      return new Token(resp.rows[0]);
    }
  }

  static async getOneByToken(token) {
    const resp = await db.query('SELECT * FROM tokens WHERE token = $1', [
      token
    ]);
    if (resp.rows.length !== 1) {
      throw new Error('Unable to locate token.');
    } else {
      return new Token(response.rows[0]);
    }
  }

  async destroy() {
    let resp = await db.query(
      'DELETE FROM tokens WHERE token_id = $1 RETURNING *;',
      [this.token_id]
    );
    return new Token(resp.rows[0]);
  }
}

module.exports = Token;
