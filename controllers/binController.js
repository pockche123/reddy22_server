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
  const id = parseInt(req.params.id);

  try {
    const bin = await Bin.findById(id);

    if (!bin) {
      return res.status(404).json({ error: 'bin not found' });
    }
    return res.status(200).json(bin);
  } catch (error) {
    console.error('Error retrieving bin:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { index, show };
