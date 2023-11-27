const binController = require('../../../controllers/binController');
const Bin = require('../../../models/Bin');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));
const mockRes = { status: mockStatus };

describe('bin controller tests', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  test('is defined', () => {
    expect(binController).toBeDefined();
  });

  describe('index', () => {
    it('should return Bins with a status code 200', async () => {
      const testBins = ['Bin1', 'Bin2'];

      jest.spyOn(Bin, 'getAll').mockResolvedValue(testBins);

      await binController.index(null, mockRes);

      expect(Bin.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testBins);
      expect(mockEnd).not.toHaveBeenCalled();
    });

    it('sends an error when failing to return Bins', async () => {
      jest
        .spyOn(Bin, 'getAll')
        .mockRejectedValue(new Error('Something happened to your db'));

      await binController.index(null, mockRes);
      expect(Bin.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Something happened to your db'
      });
    });
  });
});
