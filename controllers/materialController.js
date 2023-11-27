const Material = require('../models/Material');

const index = async (req, res) => {
  try {
    const materials = await Material.getAll();
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showMaterialsByBinId = async (req, res) => {
  const binId = parseInt(req.params.id);
  try {
    const materials = await Material.getMaterialsByBinId(binId);
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showMaterialsNotInBin = async (req, res) => {
  const binId = parseInt(req.params.id);
  try {
    const materials = await Material.getMaterialsNotInBin(binId);
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showMaterialById = async (req, res) => {
  const { material_id } = req.params;

  try {
    const material = await Material.getMaterialById(parseInt(material_id));

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    return res.status(200).json(material);
  } catch (error) {
    console.error('Error retrieving material:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  index,
  showMaterialsByBinId,
  showMaterialsNotInBin,
  showMaterialById
};
