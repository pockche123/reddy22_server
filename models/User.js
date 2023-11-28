const db = require('../database/connect');

class User {
  constructor({ user_id, username, password, is_admin }) {
    this.user_id = user_id;
    this.username = username;
    this.password = password;
    this.isAdmin = is_admin;
  }

  static getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const usersData = await db.query('SELECT * FROM users');
        const users = usersData.rows.map(
          (material) => new User(material)
        );
        resolve(users);
      } catch (error) {
        reject('error retrieving users');
      }
    });
  }

  // static async getOneById(id) {
  //   const resp = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
  //   if (resp.rows.length !== 1) throw new Error('Unable to locate user.');
  //   return new User(resp.rows[0]);
  // }

  static async getOneById(id) {
    try {
      const result = await db.query(
        'SELECT * FROM users WHERE user_id = $1',
        [id]
      );

      const users = result.rows.map((row) => new User(row));

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }


  // static async getOneByUsername(username) {
  //   const resp = await db.query('SELECT * FROM users WHERE username = $1', [
  //     username
  //   ]);
  //   if (resp.rows.length !== 1) throw new Error('Unable to locate user.');
  //   return new User(resp.rows[0]);
  // }

  static async getOneByUsername(username) {
    try {
      const result = await db.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );

      const users = result.rows.map((row) => new User(row));

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
  

  static async create(data) {
    const { username, password, isAdmin } = data;
    let resp = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id;',
      [username, password]
    );
    const newId = resp.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
