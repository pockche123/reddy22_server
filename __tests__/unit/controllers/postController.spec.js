const postController = require('../../../controllers/postController');
const Post = require('../../../models/Post');
const Token = require('../../../models/Token');
const User = require('../../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}));
const mockRes = { status: mockStatus };

describe('post controller', () => {
  beforeEach(() => jest.clearAllMocks());
  afterAll(() => jest.resetAllMocks());

  it('is defined', () => {
    expect(postController).toBeDefined();
  });

  describe('index', () => {
    test('should return Posts with a status code 200', async () => {
      const testPosts = ['Post1', 'Post2'];

      jest.spyOn(Post, 'getAll').mockResolvedValue(testPosts);

      await postController.index(null, mockRes);

      expect(Post.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testPosts);
      expect(mockEnd).not.toHaveBeenCalled();
    });

    test('should send an error when failing to return Posts', async () => {
      jest
        .spyOn(Post, 'getAll')
        .mockRejectedValue(new Error('Something happened to your db'));

      await postController.index(null, mockRes);
      expect(Post.getAll).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Something happened to your db'
      });
    });
  });

  describe('create', () => {
    test('should return created Post with a status 201', async () => {
      // Mock request data
      const testPost = {
        title: 'a post',
        content: 'content'
      };

      const mockPost = {
        post_id: 1,
        title: 'a post',
        content: 'content',
        user_id: 1
      };

      const mockToken = {
        token_id: 1,
        token: 'mockedToken',
        user_id: 1
      };

      const mockReq = {
        headers: { authorization: 'mockedToken' },
        body: testPost
      };
      jest.spyOn(Token, 'getOneByToken').mockResolvedValue(mockToken);
      jest.spyOn(Post, 'create').mockResolvedValue(mockPost);

      // Call the index function with the mocked req and res
      await postController.create(mockReq, mockRes);

      // Assertions
      expect(Token.getOneByToken).toHaveBeenCalledWith('mockedToken');
      expect(Post.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith(mockPost);
    });

    test('should send an error when failing to create a Post', async () => {
      // Mock request data
      const testPost = {
        a: 'a post',
        b: 'content'
      };

      const mockToken = {
        token_id: 1,
        token: 'mockedToken',
        user_id: 1
      };

      const mockReq = {
        headers: { authorization: 'mockedToken' },
        body: testPost
      };
      jest.spyOn(Token, 'getOneByToken').mockResolvedValue(mockToken);
      jest
        .spyOn(Post, 'create')
        .mockRejectedValue(new Error('Post could not be created'));

      // Call the index function with the mocked req and res
      await postController.create(mockReq, mockRes);

      // Assertions
      expect(Token.getOneByToken).toHaveBeenCalledWith('mockedToken');
      expect(Post.create).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Post could not be created'
      });
    });
  });

  describe('show', () => {
    let testPost, mockReq;
    beforeEach(() => {
      testPost = {
        post_id: 1,
        title: 'a post',
        content: 'content',
        user_id: 2
      };
      mockReq = { params: { id: 1 } };
    });

    test('should return a Post with a status 200', async () => {
      jest.spyOn(Post, 'getOneById').mockResolvedValue(new Post(testPost));

      await postController.show(mockReq, mockRes);

      expect(Post.getOneById).toHaveBeenCalledWith(1);
      expect(Post.getOneById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testPost);
    });

    test('sends an error upon fail', async () => {
      jest
        .spyOn(Post, 'getOneById')
        .mockRejectedValue(new Error('Post not found'));

      await postController.show(mockReq, mockRes);
      expect(Post.getOneById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Post not found'
      });
    });
  });

  describe('destroy', () => {
    test('should return no content with a status 204', async () => {
      // Mock request data
      const testPost = {
        post_id: 1,
        title: 'a post',
        content: 'content',
        user_id: 2
      };

      const mockUser = {
        user_id: 2,
        username: 'testuser',
        password: 'plainPassword',
        isAdmin: true
      };

      const mockToken = {
        token_id: 1,
        token: 'mockedToken',
        user_id: 2
      };

      const mockReq = {
        headers: { authorization: 'mockedToken' },
        params: { id: 1 }
      };
      jest.spyOn(Token, 'getOneByToken').mockResolvedValue(mockToken);
      jest.spyOn(User, 'getOneById').mockResolvedValue(mockUser);
      jest.spyOn(Post, 'getOneById').mockResolvedValue(new Post(testPost));

      jest
        .spyOn(Post.prototype, 'destroy')
        .mockResolvedValue(new Post(testPost));

      await postController.destroy(mockReq, mockRes);

      expect(Token.getOneByToken).toHaveBeenCalledWith('mockedToken');
      expect(User.getOneById).toHaveBeenCalledWith(mockUser.user_id);
      expect(Post.getOneById).toHaveBeenCalledWith(1);
      expect(Post.getOneById).toHaveBeenCalledTimes(1);
      expect(Post.prototype.destroy).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(204);
      expect(mockEnd).toHaveBeenCalled();
    });

    test('sends an error with a status 403 if not post author or admin', async () => {
      // Mock request data
      const testPost = {
        post_id: 1,
        title: 'a post',
        content: 'content',
        user_id: 3
      };

      const mockUser = {
        user_id: 2,
        username: 'testuser',
        password: 'plainPassword'
      };

      const mockToken = {
        token_id: 1,
        token: 'mockedToken',
        user_id: 2
      };

      const mockReq = {
        headers: { authorization: 'mockedToken' },
        params: { id: 1 }
      };
      jest.spyOn(Token, 'getOneByToken').mockResolvedValue(mockToken);
      jest.spyOn(User, 'getOneById').mockResolvedValue(mockUser);
      jest.spyOn(Post, 'getOneById').mockResolvedValue(new Post(testPost));

      jest
        .spyOn(Post.prototype, 'destroy')
        .mockRejectedValue(
          new Error(
            'You must be an admin or the post author to delete the post!'
          )
        );

      await postController.destroy(mockReq, mockRes);

      expect(Token.getOneByToken).toHaveBeenCalledWith('mockedToken');
      expect(User.getOneById).toHaveBeenCalledWith(mockUser.user_id);
      expect(Post.getOneById).toHaveBeenCalledWith(1);
      expect(Post.getOneById).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(403);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'You must be an admin or the post author to delete the post!'
      });
    });

    test('sends an error with a status 404 if the post was not found', async () => {
      const mockUser = {
        user_id: 2,
        username: 'testuser',
        password: 'plainPassword'
      };

      const mockToken = {
        token_id: 1,
        token: 'mockedToken',
        user_id: 2
      };

      const mockReq = {
        headers: { authorization: 'mockedToken' },
        params: { id: 1 }
      };
      jest.spyOn(Token, 'getOneByToken').mockResolvedValue(mockToken);
      jest.spyOn(User, 'getOneById').mockResolvedValue(mockUser);
      jest
        .spyOn(Post, 'getOneById')
        .mockRejectedValue(new Error('Post not found'));

      await postController.destroy(mockReq, mockRes);

      expect(Token.getOneByToken).toHaveBeenCalledWith('mockedToken');
      expect(User.getOneById).toHaveBeenCalledWith(mockUser.user_id);
      expect(Post.getOneById).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Post not found'
      });
    });
  });
});
