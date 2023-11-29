const { v4: uuidv4 } = require('uuid');
const Token = require('../../../models/Token'); 
const db = require('../../../database/connect');

jest.mock('../../../database/connect');

describe('Token Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new token for a user_id and return it', async () => {
      const user_id = 1;

      // Mock the db.query function to return the new token_id
      db.query.mockResolvedValueOnce({
        rows: [{ token_id: 2 }],
      });

      // Mock the db.query function for fetching the newly created token
      db.query.mockResolvedValueOnce({
        rows: [new Token({ token_id: 2, user_id, token: uuidv4() })],
      });

      const newToken = await Token.create(user_id);
      expect(newToken).toBeInstanceOf(Token);
      expect(newToken.user_id).toEqual(user_id);
    });
  });

  describe('getOneById', () => {
    it('should return a token for a specified token_id', async () => {
      const expectedToken = new Token({ token_id: 1, user_id: 1, token: uuidv4() });

      // Mock the db.query function to return sample data
      db.query.mockResolvedValueOnce({
        rows: [expectedToken],
      });

      const token = await Token.getOneById(1);
      expect(token).toBeInstanceOf(Token);
      expect(token).toEqual(expectedToken);
    });

    it('should throw an error for an invalid token_id', async () => {
      // Mock the db.query function to return no rows (token not found)
      db.query.mockResolvedValueOnce({
        rows: [],
      });

      await expect(Token.getOneById(999)).rejects.toThrow('Unable to locate token.');
    });
  });

  describe('getOneByToken', () => {
    it('should return a token for a specified token value', async () => {
      const expectedToken = new Token({ token_id: 1, user_id: 1, token: 'test_token' });

      // Mock the db.query function to return sample data
      db.query.mockResolvedValueOnce({
        rows: [expectedToken],
      });

      const token = await Token.getOneByToken('test_token');
      expect(token).toBeInstanceOf(Token);
      expect(token).toEqual(expectedToken);
    });

    it('should throw an error for an invalid token value', async () => {
      // Mock the db.query function to return no rows (token not found)
      db.query.mockResolvedValueOnce({
        rows: [],
      });

      await expect(Token.getOneByToken('invalid_token')).rejects.toThrow('Unable to locate token.');
    });
  });

  describe('destroy', () => {
    it('should destroy a token and return the destroyed token', async () => {
      const tokenToDelete = new Token({ token_id: 1, user_id: 1, token: uuidv4() });

      // Mock the db.query function to return the deleted token
      db.query.mockResolvedValueOnce({
        rows: [tokenToDelete],
      });

      const deletedToken = await tokenToDelete.destroy();
      expect(deletedToken).toBeInstanceOf(Token);
      expect(deletedToken).toEqual(tokenToDelete);
    });
  });
});
