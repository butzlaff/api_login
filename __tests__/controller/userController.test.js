const { createUser, findUserById, login } = require('../../src/controllers/User.controller');
const { UserService } = require('../../src/services/index');
const { user, userDatabaseCreation } = require('../mocks/user');
const { returnUser } = require('../mocks/returnUser');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6IkVtaWxpbyBCdXR6bGFmZiIsImVtYWlsIjoiZW1pbGlvYnV0ekBnbWFpbC5jb20iLCJzZW5oYSI6IiQyYSQxMCRUVVZ2Y1dFTmF4bEFsaThGYjRUbFguSlU3N09YdklLNWlIVVMxdnhZTjRocS9YejZ4SUxUTyIsInVsdGltb0xvZ2luIjoiMjAyMy0xMS0yMVQyMTo1NjowNS4xMzZaIiwiZGF0YUNyaWFjYW8iOiIyMDIzLTExLTIxVDE5OjMxOjA4LjUxN1oiLCJkYXRhQXR1YWxpemFjYW8iOiIyMDIzLTExLTIxVDIxOjU2OjA1LjEzOFoiLCJpYXQiOjE3MDA2MDM3NjUsImV4cCI6MTcwMDYwNTU2NX0.wc9JWFZdgeQMCmH7xAy0KZT7xjKD_QPL6rMtvl1nkys"

describe('Test UserController', () => {
  let req, res, next;
  describe('Test the createUser fuction', () => {
    beforeEach(() => {
      req = {
        body: {
          email: 'test@example.com',
          senha: 'password123'
        }
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      next = jest.fn();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should return status 200 and a data object', async () => {
      const req = { body: user };

      UserService.createUser = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      UserService.getUserByEmail = jest.fn().mockResolvedValueOnce(null);
      UserService.authenticateUser = jest.fn().mockResolvedValueOnce(token);
      
      await createUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ ...returnUser, token });
    });
    it('should return next middleware called with name: "INVALID_DATA" when data is missing in body', async () => {
      req = { body: { email: "john.doe@example.com"} };

      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith({ name: "INVALID_DATA" });
    });

    it('should return next middleware called with name: "EMAIL_ALREADY_EXISTS" when e-mail already exists', async () => {
      req = { body: user };

      UserService.createUser = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      UserService.getUserByEmail = jest.fn().mockResolvedValueOnce(true);
      UserService.authenticateUser = jest.fn().mockResolvedValueOnce(token);
    
      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith({ name: "EMAIL_ALREADY_EXISTS" });
    });

    it('should return next middleware called with name: "INVALID_EMAIL" when e-mail is invalid', async () => {
      req = { body: {...user, email: 'john.doe-example.com'} };

      UserService.createUser = jest.fn().mockResolvedValueOnce(null);
      UserService.getUserByEmail = jest.fn().mockResolvedValueOnce(null);
      UserService.authenticateUser = jest.fn().mockResolvedValueOnce(token);
    
      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith({ name: "INVALID_EMAIL" });
    });


    it('should return next middleware called with name: "INVALID_LOGIN" when user or password is invalid', async () => {
      req = { body: user };

      UserService.createUser = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      UserService.getUserByEmail = jest.fn().mockResolvedValueOnce(null);
      UserService.authenticateUser = jest.fn().mockResolvedValueOnce(null);

      UserService.createUser = jest.fn().mockResolvedValueOnce({ status: 400, data: { mensagem: "E-mail já existente"} });

      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith({ name: "INVALID_LOGIN" });
    });
  });
  describe('Test the findUserById fuction', () => {
    it('should return user data if user exists', async () => {
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      UserService.getByUserId = jest.fn().mockResolvedValue({ id: 1, ...userDatabaseCreation});
  
      await findUserById(req, res, next);
  
      expect(UserService.getByUserId).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ email: user.email, ...returnUser });
      expect(next).not.toHaveBeenCalled();
    });
  
    it('should call the next middleware with USER_NOT_FOUND error if user does not exist', async () => {
      const req = { params: { id: '999' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();
  
      UserService.getByUserId = jest.fn().mockResolvedValue(null);
  
      await findUserById(req, res, next);
  
      expect(UserService.getByUserId).toHaveBeenCalledWith(999);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith({ name: 'USER_NOT_FOUND' });
    });
  });
  describe('Test the login fuction', () => {
    it('should return user and token if sucessful', async () => {
      UserService.getUserByEmail = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      UserService.authenticateUser = jest.fn().mockResolvedValueOnce(token);
      
      const req = { body: { email: 'test@example.com', senha: 'password123'} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const next = jest.fn();

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ...returnUser, token });
    })
    it('should return "INVALID_DATA" when invalid data', async () => {
      UserService.getUserByEmail = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      UserService.authenticateUser = jest.fn().mockResolvedValueOnce(token);
      
      const req = { body: { email: 'test@example.com' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const next = jest.fn();

      await login(req, res, next);
      
      expect(next).toHaveBeenCalledWith({ name: 'INVALID_DATA' });
    })
    it('should return "INVALID_LOGIN" when wrong email or password', async () => {
      UserService.getUserByEmail = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      UserService.authenticateUser = jest.fn().mockResolvedValueOnce(null);
      
      const req = { body: { email: 'test@example.com', senha: 'password123'} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const next = jest.fn();

      await login(req, res, next);
      
      expect(next).toHaveBeenCalledWith({ name: 'INVALID_LOGIN' });
    })
  })
});