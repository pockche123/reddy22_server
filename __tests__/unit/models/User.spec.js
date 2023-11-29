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
            } catch (error) {
              expect(error).toBeDefined()
              expect(error.message).toBe('error retrieving users')
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

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query')
              .mockResolvedValueOnce({ rows: [] })
      
            try {
              await User.getOneById(1)
            } catch (err) {
              expect(err).toBeDefined()
              expect(err.message).toBe("Unable to locate user.")
            }
          })
    })


    describe('getUsernameById', () => {
        it('resolves with usersname for a given ID on success', async () => {
            let testUser = {
                        user_id: 1,
                        username: "AlexTest",
                        password: "jkl",
                        address: "The World",
                        is_admin: true,
                        isCouncilMember: false
                    }
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: [testUser]})
         
            const Users = await User.getUsernameById(1)
            expect(Users).toBeInstanceOf(User)
            expect(Users).toHaveProperty('username')
            expect(Users.username).toBe('AlexTest')
            expect(Users.id).toBe(1)
        })

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query')
              .mockResolvedValueOnce({ rows: [] })
      
            try {
              await User.getUsernameById(1)
            } catch (err) {
              expect(err).toBeDefined()
              expect(err.message).toBe("Unable to locate user.")
            }
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

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query')
              .mockResolvedValueOnce({ rows: [] })
      
            try {
              await User.getOneByUsername(1)
            } catch (err) {
              expect(err).toBeDefined()
              expect(err.message).toBe("Unable to locate user.")
            }
          })
    })


    describe('create', () => {
        it('creates a new user given username and password', async () => {
           const testUser = {
                user_id: 1,
                username: "AlexTest",
                password: "jkl",
                address: "The World",
                is_admin: true,
                isCouncilMember: false
            }

            const testUser2 = {
                user_id: 2,
                username: "AlexTest2",
                password: "jkl",
                address: "The World",
                is_admin: true,
                isCouncilMember: false
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows:[testUser]
             })
            
            jest.spyOn(db, 'query').mockResolvedValueOnce({
                rows: [new User({ user_id: 2, ...testUser2 })],
              })
    
            const result = await User.create(testUser2)
            expect(result).toBeTruthy()
            expect(result).toBeInstanceOf(User)
         })
    
        it('should throw an Error on db query error', async () => {
    
            try {
                await User.create({ username: "AlexTest", password: "jkl"})
            } catch (error) {
                expect(error).toBeTruthy()
            }
        })
        })




})
