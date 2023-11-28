const materialController = require('../../../controllers/materialController');
const Material = require('../../../models/Material');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));
const mockRes = { status: mockStatus };

describe('material controller tests', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  test('is defined', () => {
    expect(materialController).toBeDefined();
  });

  describe('index', () => {
    it('should return materials with a status code 200', async () => {
      const testmaterials = ['material1', 'material2'];

      jest.spyOn(Material, 'getAll').mockResolvedValue(testmaterials);

      await materialController.index(null, mockRes);

      expect(Material.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testmaterials);
      expect(mockEnd).not.toHaveBeenCalled();
    });

    it('sends an error when failing to return materials', async () => {
      jest
        .spyOn(Material, 'getAll')
        .mockRejectedValue(new Error('Something happened to your db'));

      await materialController.index(null, mockRes);
      expect(Material.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Something happened to your db'
      });
    });
  });

  describe('show by binID', () => {
    let testMaterial, mockReq;
    beforeEach(() => {
      testMaterial = {
        material_id: 1,
        name: 'paper',
        material_image: 'image_link',
        bin_id: 2
      };
      mockReq = { params: { id: 2 } };
    });

    test('return a material with a 200 status code', async () => {
      jest
        .spyOn(Material, 'getMaterialsByBinId')
        .mockResolvedValue(new Material(testMaterial));

      await materialController.showMaterialsByBinId(mockReq, mockRes);
      expect(Material.getMaterialsByBinId).toHaveBeenCalledWith(2);
      expect(Material.getMaterialsByBinId).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testMaterial);
    });

    test('sends an error upon fail', async () => {
      jest
        .spyOn(Material, 'getMaterialsByBinId')
        .mockRejectedValue(new Error('Material not found'));

      await materialController.showMaterialsByBinId(mockReq, mockRes);
      expect(Material.getMaterialsByBinId).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });

  describe('show by not binID', () => {
    let testMaterial, mockReq;
    beforeEach(() => {
      testMaterial = {
        material_id: 1,
        name: 'paper',
        material_image: 'image_link',
        bin_id: 2
      };
      mockReq = { params: { id: 3 } };
    });

    test('return a material with a 200 status code', async () => {
      jest
        .spyOn(Material, 'getMaterialsNotInBin')
        .mockResolvedValue(new Material(testMaterial));

      await materialController.showMaterialsNotInBin(mockReq, mockRes);
      expect(Material.getMaterialsNotInBin).toHaveBeenCalledWith(3);
      expect(Material.getMaterialsNotInBin).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testMaterial);
    });

    test('sends an error upon fail', async () => {
      jest
        .spyOn(Material, 'getMaterialsNotInBin')
        .mockRejectedValue(new Error('Material not found'));

      await materialController.showMaterialsByBinId(mockReq, mockRes);
      expect(Material.getMaterialsByBinId).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });

  describe('show material by id', () => {
    let testMaterial, mockReq;
    beforeEach(() => {
      testMaterial = {
        material_id: 3,
        name: 'paper',
        material_image: 'image_link',
        bin_id: 2
      };
      mockReq = { params: { id: 3 } };
    });

    test('return a material with a 200 status code', async () => {
      jest
        .spyOn(Material, 'getMaterialById')
        .mockResolvedValue(new Material(testMaterial));

      await materialController.showMaterialById(mockReq, mockRes);
      expect(Material.getMaterialById).toHaveBeenCalledWith(3);
      expect(Material.getMaterialById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testMaterial);
    });

    test('sends an error upon fail', async () => {
      jest
        .spyOn(Material, 'getMaterialById')
        .mockRejectedValue(new Error('Material not found'));

      await materialController.showMaterialById(mockReq, mockRes);
      expect(Material.getMaterialById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });
});
