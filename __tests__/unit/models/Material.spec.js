const Material = require('../../../models/Material')
const db = require('../../../database/connect')

let mockData

describe('Material', () => {
    beforeEach(() => {
        jest.clearAllMocks()

        mockData = {
            rows: [
                {
                    material_id: 1,
                    name: 'Plastic Bottles',
                    material_image: 'https://example.com/plastic-bottles-image.jpg',
                    Material_id: 1
                },
                {
                    name: 'Glass Bottles',
                    material_image: 'https://example.com/glass-bottles-image.jpg',
                    Material_id: 1
                },
                {
                    name: 'Metal Cans',
                    material_image: 'https://example.com/metal-cans-image.jpg',
                    Material_id: 1
                }
            ]
        }
    })
    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Material).toBeDefined()
    })

    describe('getAll', () => {
        it('resolves with Materials on successful', async () => {
            //act
            jest.spyOn(db, 'query').mockResolvedValueOnce(mockData)
            const Materials = await Material.getAll()
            //assert
            expect(Materials).toHaveLength(3)
            //verify
            expect(Materials[0]).toHaveProperty('material_image')
        })
    })

    describe('getMaterialsByBinId', () => {
        it('resolves with materials for a given bin ID on success', async () => {
            // Arrange
            const binId = 1
            jest.spyOn(db, 'query').mockResolvedValueOnce(mockData)

            // Act
            const materials = await Material.getMaterialsByBinId(binId)

            // Assert
            expect(materials).toHaveLength(3)
            expect(materials[0]).toHaveProperty('material_image')
        })

        it('handles errors gracefully', async () => {
            // Arrange
            const binId = 1
            const errorMessage = 'Database error'
            jest.spyOn(db, 'query').mockRejectedValueOnce(new Error(errorMessage))

            // Act and Assert
            await expect(Material.getMaterialsByBinId(binId)).rejects.toThrow(
                errorMessage
            )
        })
    })

    describe('getMaterialsNotInBin', () => {
        it('resolves with materials not in the specified bin ID on success', async () => {
            // Arrange
            const binId = 1
            jest.spyOn(db, 'query').mockResolvedValueOnce(mockData)

            // Act
            const materials = await Material.getMaterialsNotInBin(binId)

            // Assert
            expect(materials).toHaveLength(3)
            expect(materials[0]).toHaveProperty('material_image')
        })

        it('handles errors gracefully', async () => {
            // Arrange
            const binId = 1
            const errorMessage = 'Database error'
            jest.spyOn(db, 'query').mockRejectedValueOnce(new Error(errorMessage))

            // Act and Assert
            await expect(Material.getMaterialsNotInBin(binId)).rejects.toThrow(
                errorMessage
            )
        })
    })


    describe('getMaterialById', () => {


        it("resolves with material on successful db query", async () => {
            // act
            jest
                .spyOn(db, "query")
                .mockResolvedValueOnce({ rows: [mockData.rows[0]] });
            // assert
            const result = await Material.getMaterialById(1);
            expect(result.material_id).toBe(1);
            expect(result).toBeInstanceOf(Material);

        });


        it('throws an error when unable to locate the material', async () => {
            // Arrange
            const materialId = 2;
            const errorMessage = 'Unable to locate material.';
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

            // Act and Assert
            await expect(Material.getMaterialById(materialId)).rejects.toThrow(errorMessage);
        });

    });
})
