const Post = require('../../../models/Post');
const db = require('../../../database/connect');


jest.mock('../../../database/connect');

describe('Post Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return an array of posts', async () => {
      // Mock the db.query function to return sample data
      db.query.mockResolvedValueOnce({
        rows: [{ post_id: 1, user_id: 1, title: 'Test Title', content: 'Test Content' }],
      });

      const posts = await Post.getAll();
      expect(posts).toHaveLength(1);
      expect(posts[0]).toBeInstanceOf(Post);
    });
  });

  describe('getOneById', () => {
    it('should return a post for a specified post_id', async () => {
      const expectedPost = new Post({ post_id: 1, user_id: 1, title: 'Test Title', content: 'Test Content' });

      // Mock the db.query function to return sample data
      db.query.mockResolvedValueOnce({
        rows: [expectedPost],
      });

      const post = await Post.getOneById(1);
      expect(post).toBeInstanceOf(Post);
      expect(post).toEqual(expectedPost);
    });

    it('should throw an error for an invalid post_id', async () => {
      // Mock the db.query function to return no rows (post not found)
      db.query.mockResolvedValueOnce({
        rows: [],
      });

      await expect(Post.getOneById(999)).rejects.toThrow('Unable to locate post.');
    });
  });

  describe('create', () => {
    it('should create a new post and return it', async () => {
      const postData = { title: 'New Title', content: 'New Content', user_id: 1 };

      // Mock the db.query function to return the new post_id
      db.query.mockResolvedValueOnce({
        rows: [{ post_id: 2 }],
      });

      // Mock the db.query function for fetching the newly created post
      db.query.mockResolvedValueOnce({
        rows: [new Post({ post_id: 2, ...postData })],
      });

      const newPost = await Post.create(postData);
      expect(newPost).toBeInstanceOf(Post);
      expect(newPost.title).toEqual(postData.title);
      expect(newPost.content).toEqual(postData.content);
      expect(newPost.user_id).toEqual(postData.user_id);
    });
  });

  describe('destroy', () => {
    it('should destroy a post and return the destroyed post', async () => {
      const postToDelete = new Post({ post_id: 1, user_id: 1, title: 'Test Title', content: 'Test Content' });

      // Mock the db.query function to return the deleted post
      db.query.mockResolvedValueOnce({
        rows: [postToDelete],
      });

      const deletedPost = await postToDelete.destroy();
      expect(deletedPost).toBeInstanceOf(Post);
      expect(deletedPost).toEqual(postToDelete);
    });
  });
});
