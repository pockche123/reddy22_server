const db = require("../database/connect");

class Material {
  constructor({ material_id, name, material_image, bin_id }) {
    this.material_id = material_id;
    this.name = name;
    this.material_image = material_image;
    this.bin_id = bin_id;
  }

  static getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const materialsData = await db.query("SELECT * FROM materials");
        const materials = materialsData.rows.map(
          (material) => new Material(material)
        );
        resolve(materials);
      } catch (error) {
        reject("error retrieving bins");
      }
    });
  }

  static async getMaterialsByBinId(id) {
    try {
      const result = await db.query(
        "SELECT * FROM materials WHERE bin_id = $1",
        [id]
      );

      const materials = result.rows.map((row) => new Material(row));

      return materials;
    } catch (error) {
      console.error("Error fetching materials:", error);
      throw error;
    }
  }

  static async getMaterialsNotInBin(id) {
    try {
      const result = await db.query(
        "SELECT * FROM materials WHERE bin_id <> $1 ORDER BY RANDOM() LIMIT 4",
        [id]
      );

      const materials = result.rows.map((row) => new Material(row));

      return materials;
    } catch (error) {
      console.error("Error fetching materials:", error);
      throw error;
    }
  }
  
  static async showMaterialById(material_id) {
    try {
      const result = await db.query(
        'SELECT * FROM materials WHERE material_id = $1',
        [material_id]
      );

      if (result.rows.length === 0) {
        return null; 
      }

      return new Material(result.rows[0]);
    } catch (error) {
      console.error('Error fetching material:', error);
      throw error;
    }
  }

}




module.exports = Material;
