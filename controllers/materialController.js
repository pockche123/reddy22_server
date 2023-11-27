const Material = require('../models/Material')


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



module.exports = {index, showMaterialsByBinId, showMaterialsNotInBin}

