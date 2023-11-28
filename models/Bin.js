const db = require('../database/connect');

class Bin {
  constructor({ bin_id, bin_type, color, bin_image, info }) {
    this.bin_id = bin_id;
    this.bin_type = bin_type;
    this.color = color;
    this.bin_image = bin_image;
    this.info = info;
  }

  static getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const binsData = await db.query('SELECT * FROM bins');
        const bins = binsData.rows.map((bin) => new Bin(bin));
        resolve(bins);
      } catch (error) {
        reject('error retrieving bins');
      }
    });
  }

  
  static async findById(id) {
    const result = await db.query(
      'SELECT * FROM bins WHERE bins = $1',
      [id]
    );

    if (result.rows.length !== 1) {
      throw new Error('Unable to locate bin.');
    }

    return new Bin(result.rows[0]);
  }



}

module.exports = Bin;
