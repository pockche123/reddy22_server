const Bin = require('../models/Bin');

const index = async (req, res) => {
  try {
    const bins = await Bin.getAll();
    console.log('bins: ', bins);
    res.status(200).json(bins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const show = async (req, res) => {

  try {
      const id = parseInt(req.params.id);
    const bin = await Bin.findById(id);
    return res.status(200).json(bin);
  } catch (error) {
    res.status(404).send({error: error.message})
  }
};

module.exports = { index, show };
