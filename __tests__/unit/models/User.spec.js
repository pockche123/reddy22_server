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
         
            jest.spyOn(db, 'query').mockResolvedValueOnce(mockData)
            const Users = await User.getAll()
            expect(Users).toHaveLength(2)
            expect(Users[0]).toHaveProperty('username')
        })

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query')
              .mockResolvedValueOnce({ rows: [] })
      
            try {
              await User.getAll()
            } catch (err) {
              expect(err).toBeDefined()
              expect(err.message).toBe("No users available.")
            }
          })
    })

    
    describe('getOneById', () => {
        it('resolves with users for a given ID on success', async () => {
            let testUser = {
                        user_id: 1,
                        username: "AlexTest",
                        password: "jkl",
                        address: "The World",
                        is_admin: true,
                        isCouncilMember: false
                    }
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [testUser]})
         
            const Users = await User.getOneById(1)
            expect(Users).toBeInstanceOf(User)
            expect(Users).toHaveProperty('username')
            expect(Users.username).toBe('AlexTest')
            expect(Users.id).toBe(1)
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
        it('resolves with users for a given ID on success', async () => {
            let testUser = {
                        user_id: 1,
                        username: "AlexTest",
                        password: "jkl",
                        address: "The World",
                        is_admin: true,
                        isCouncilMember: false
                    }
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [testUser]})
         
            const Users = await User.getOneByUsername('AlexTest')
            expect(Users).toBeInstanceOf(User)
            expect(Users).toHaveProperty('username')
            expect(Users.username).toBe('AlexTest')
            expect(Users.id).toBe(1)
        })

        it('handles errors gracefully', async () => {
            // Arrange
            const userId = 5
            const errorMessage = 'Error fetching users:'
            jest.spyOn(db, 'query').mockRejectedValueOnce(new Error(errorMessage))

            // Act and Assert
            await expect(User.getOneByUsername(userId)).rejects.toThrow(
                errorMessage
            )
        })
    })


    describe('create', () => {
        it('creates a new user given username and password', async () => {
            
            let testUser = {
                        user_id: 1,
                        username: "AlexTest3",
                        password: "jkl"
                    }

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...testUser}] })
    
            const result = await User.create(testUser)
            expect(result).toBeTruthy()
            expect(result).toHaveProperty('user_id')
            // expect(result).toHaveProperty('username')
         })
    
        it('should throw an Error on db query error', async () => {
    
            try {
                await User.create({ username: "AlexTest3", password: "jkl"})
            } catch (error) {
                expect(error).toBeTruthy()
            }
        })
        })


})
