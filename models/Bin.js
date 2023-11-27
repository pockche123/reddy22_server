const db = require('../database/connect')



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
                const binsData = await db.query("SELECT * FROM bins");
                const bins = binsData.rows.map(bin => new Bin(bin));
                resolve(bins)
            } catch (error) {
                reject('error retrieving bins')
            }
        })
    }




}

module.exports = Bin
