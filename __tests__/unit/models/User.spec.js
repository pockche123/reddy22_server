const User = require('../../../models/User')
const db = require('../../../database/connect')

let mockData

describe('User', () => {

    beforeEach(() => {
        jest.clearAllMocks()

        mockData = {
            rows: [
                {
                    user_id: 1,
                    username: "AlexTest",
                    password: "jkl",
                    address: "The World",
                    is_admin: true,
                    isCouncilMember: false
                },
                {
                    user_id: 2,
                    username: "AlexTest2",
                    password: "jkl",
                    address: "The World",
                    is_admin: true,
                    isCouncilMember: false
                }
            ]
        }
    })

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(User).toBeDefined()
    })

    describe('getAll', () => {
        it('resolves with Users on successful', async () => {
            //act
            jest.spyOn(db, 'query').mockResolvedValueOnce(mockData)
            const Users = await User.getAll()
            //assert
            expect(Users).toHaveLength(2)
            //verify
            expect(Users[0]).toHaveProperty('username')
        })
    })

    
    describe('getOneById', () => {
        it('resolves with users for a given ID on success', async () => {
            // Arrange
            const userId = 1
            jest.spyOn(db, 'query').mockResolvedValueOnce(mockData)
            // Act
            const users = await User.getOneById(userId)
            // Assert
            expect(users).toHaveLength(2)
            expect(users[0]).toHaveProperty('username')
        })

        it('handles errors gracefully', async () => {
            // Arrange
            const userId = 5
            const errorMessage = 'Error fetching users:'
            jest.spyOn(db, 'query').mockRejectedValueOnce(new Error(errorMessage))

            // Act and Assert
            await expect(User.getOneById(userId)).rejects.toThrow(
                errorMessage
            )
        })
    })

    describe('getOneByUsername', () => {
        it('resolves with users for a given Username on success', async () => {
            // Arrange
            const username = "AlexTest"
            jest.spyOn(db, 'query').mockResolvedValueOnce(mockData)
            // Act
            const users = await User.getOneByUsername(username)
            // Assert
            expect(users).toHaveLength(2)
            expect(users[0]).toHaveProperty('username')
        })

        it('handles errors gracefully', async () => {
            // Arrange
            const username = "fake"
            const errorMessage = 'Error fetching users:'
            jest.spyOn(db, 'query').mockRejectedValueOnce(new Error(errorMessage))

            // Act and Assert
            await expect(User.getOneByUsername(username)).rejects.toThrow(
                errorMessage
            )
        })
    })


    describe('create', () => {
        it('creates a new user given username and password', async () => {
            // Arrange
            const newUser = {
                rows: [
                    {
                        user_id: 1,
                        username: "AlexTest3",
                        password: "jkl",
                        address: "The World",
                        is_admin: true,
                        isCouncilMember: false
                    }
                ]
        };

            jest.spyOn(db, 'query').mockResolvedValueOnce(newUser)

            const users = await User.create(newUser)
            // Assert
            expect(users[0]).toHaveProperty('password')
            expect(users[0]).toHaveProperty('username')
        })

        it('handles errors gracefully', async () => {
            // Arrange
            const username = "AlexTest"
            const errorMessage = 'Error creating user'
            jest.spyOn(db, 'query').mockRejectedValueOnce(new Error(errorMessage))

            // Act and Assert
            await expect(User.create(username)).rejects.toThrow(
                errorMessage
            )
        })
    })


})
