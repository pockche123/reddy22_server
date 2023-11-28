const bcrypt = require('bcrypt');
const userController = require('../../../controllers/userController');
const User = require('../../../models/User');
const Token = require('../../../models/Token');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

// Mock the User.create function

describe('user controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('is defined', () => {
    expect(userController).toBeDefined();
  });

  describe('register', () => {
    it('registers a new user successfully', async () => {
      // Mock request data
      const testUser = {
        id: 1,
        username: 'testuser',
        password: 'hashedPassword'
      };

      const mockReq = { body: testUser };

      // Mock bcrypt.genSalt and bcrypt.hash
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('mockedSalt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

      // Create a mock user with the same structure as the resolved value of User.create
      const mockUser = new User(testUser);
      jest.spyOn(User, 'create').mockResolvedValue(mockUser);

      await userController.register(mockReq, mockRes);

      // Assertions
      expect(bcrypt.genSalt).toHaveBeenCalledWith(
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('hashedPassword', 'mockedSalt');
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith(mockUser);
    });
    it('handles registration error', async () => {
      let testUser = { name: 'user1' };
      const mockReq = { body: testUser };

      jest
        .spyOn(User, 'create')
        .mockRejectedValue(new Error('New User not made'));

      await userController.register(mockReq, mockRes);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'New User not made' });
    });
  });

  describe('login', () => {
    it('authenticates a user successfully', async () => {
      // Mock request data
      const testUser = {
        username: 'testuser',
        password: 'hashedPassword'
      };

      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'plainPassword'
      };

      const mockReq = { body: testUser };

      // Mock User.getOneByUsername and Token.create
      jest.spyOn(User, 'getOneByUsername').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest
        .spyOn(Token, 'create')
        .mockResolvedValue({ token: 'mockedToken', user_id: 1 });

      // Call the login function with the mocked req and res
      await userController.login(mockReq, mockRes);

      // Assertions
      expect(User.getOneByUsername).toHaveBeenCalledWith(testUser.username);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        testUser.password,
        mockUser.password
      );
      expect(Token.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        authenticated: true,
        token: 'mockedToken'
      });
    });

    test('handles login error', async () => {
      // Mock request data
      const testData = {
        username: 'testuser',
        password: 'password123'
      };

      // Mock req and res objects
      const mockReq = { body: testData };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock User.getByUsername throwing an error
      jest
        .spyOn(User, 'getOneByUsername')
        .mockRejectedValue(new Error('User not found'));

      // Call the login function with the mocked req and res
      await userController.login(mockReq, mockRes);

      // Assertions
      expect(User.getOneByUsername).toHaveBeenCalledWith(testData.username);
      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('logout', () => {
    it('logs out a user successfully', async () => {
      // Mock request data
      const mockReq = { headers: { authorization: 'mockedToken' } };

      // Mock Token.getOneByToken and Token.destroy
      const mockToken = {
        id: 1,
        token: 'mockedToken',
        user_id: 1,
        destroy: jest.fn().mockResolvedValue({ success: true })
      };
      jest.spyOn(Token, 'getOneByToken').mockResolvedValue(mockToken);

      // Call the logout function with the mocked req and res
      await userController.logout(mockReq, mockRes);

      // Assertions
      expect(Token.getOneByToken).toHaveBeenCalledWith('mockedToken');
      expect(mockToken.destroy).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ success: true });
    });
  });
});
