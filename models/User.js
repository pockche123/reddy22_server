const db = require('../database/connect');

class User {
  constructor({ user_id, username, password, isadmin, iscouncilmember }) {
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.isAdmin = isadmin;
    this.isCouncilMember = iscouncilmember;
  }

  static getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const usersData = await db.query('SELECT * FROM users');
        const users = usersData.rows.map((user) => new User(user));
        resolve(users);
      } catch (error) {
        reject('error retrieving users');
      }
    });
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM users WHERE user_id = $1', [
      id
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async getUsernameById(id) {
    const response = await db.query(
      'SELECT username FROM users WHERE user_id = $1',
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query('SELECT * FROM users WHERE username = $1', [
      username
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password, isAdmin, isCouncilMember } = data;
    let response = await db.query(
      'INSERT INTO users (username, password, isAdmin, isCouncilMember) VALUES ($1, $2, $3, $4) RETURNING user_id;',
      [username, password, isAdmin, isCouncilMember]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
