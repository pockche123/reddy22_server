const Bin = require('../../../models/Bin')
const db = require('../../../database/connect')

let mockData

describe('Bin', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockData = {
            rows: [
                {
                    id: 1,
                    bin_type: 'Recycling Collection',
                    color: 'Blue',
                    bin_image: 'https://example.com/blue-bin-image.jpg',
                    info: 'Your 240-litre recycling bin will be collected every fortnight – check the collection calendar for your collection day.'
                },
                {
                    id: 2,
                    bin_type: 'Refuse Collection',
                    color: 'Grey',
                    bin_image: 'https://example.com/grey-bin-image.jpg',
                    info: 'The grey bin is collected every three weeks. Please use your grey bin for household items that cannot be recycled. All rubbish must be contained in the grey bin with the lid firmly closed. Bags of rubbish left anywhere around the bin will not be collected. Any extra rubbish can be taken to a Household Waste Recycling Centre.'
                }
            ]
        }
    })
    afterAll(() => jest.resetAllMocks()); 

    it('is defined', () => {
        expect(Bin).toBeDefined()
    })

       describe("getAll", () => {
        it("resolves with bins on successful", async () => {
            //act
            jest.spyOn(db, "query").mockResolvedValueOnce(mockData);
            const bins = await Bin.getAll();
            //assert
            expect(bins).toHaveLength(2);
            //verify
            expect(bins[0]).toHaveProperty("bin_image");
        });
    });
})
