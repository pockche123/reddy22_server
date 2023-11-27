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

module.exports = { index };
