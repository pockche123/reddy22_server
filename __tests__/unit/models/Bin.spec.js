const Bin = require('../../../models/Bin')
const db = require('../../../database/connect')

jest.mock('../../../database/connect');

describe('Bin Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return an array of bins', async () => {
      // Mock the db.query function to return sample data
      const mockBinsData = {
        rows: [
          { bin_id: 1, bin_type: 'Recycling', color: 'Blue', bin_image: 'recycling.png', info: 'Recycling bin' },
          { bin_id: 2, bin_type: 'Trash', color: 'Gray', bin_image: 'trash.png', info: 'Trash bin' },
        ],
      };

      db.query.mockResolvedValueOnce(mockBinsData);

      const bins = await Bin.getAll();
      expect(bins).toHaveLength(2);
      expect(bins[0]).toBeInstanceOf(Bin);
      expect(bins[1]).toBeInstanceOf(Bin);
    });

  });

  describe('findById', () => {
    it('should return a bin for a specified bin_id', async () => {
      const expectedBin = new Bin({
        bin_id: 1,
        bin_type: 'Recycling',
        color: 'Blue',
        bin_image: 'recycling.png',
        info: 'Recycling bin',
      });

      // Mock the db.query function to return sample data
      db.query.mockResolvedValueOnce({
        rows: [expectedBin],
      });

      const bin = await Bin.findById(1);
      expect(bin).toBeInstanceOf(Bin);
      expect(bin).toEqual(expectedBin);
    });

    it('should throw an error for an invalid bin_id', async () => {
      // Mock the db.query function to return no rows (bin not found)
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });

      await expect(Bin.findById(999)).rejects.toThrow('Unable to locate bin.');
    });
  });
});
