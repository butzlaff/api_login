const { createUser } = require('../../src/controllers/User.controller');
const {UserService} = require('../../src/services/index');
const user = require('../mocks/user');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6IkVtaWxpbyBCdXR6bGFmZiIsImVtYWlsIjoiZW1pbGlvYnV0ekBnbWFpbC5jb20iLCJzZW5oYSI6IiQyYSQxMCRUVVZ2Y1dFTmF4bEFsaThGYjRUbFguSlU3N09YdklLNWlIVVMxdnhZTjRocS9YejZ4SUxUTyIsInVsdGltb0xvZ2luIjoiMjAyMy0xMS0yMVQyMTo1NjowNS4xMzZaIiwiZGF0YUNyaWFjYW8iOiIyMDIzLTExLTIxVDE5OjMxOjA4LjUxN1oiLCJkYXRhQXR1YWxpemFjYW8iOiIyMDIzLTExLTIxVDIxOjU2OjA1LjEzOFoiLCJpYXQiOjE3MDA2MDM3NjUsImV4cCI6MTcwMDYwNTU2NX0.wc9JWFZdgeQMCmH7xAy0KZT7xjKD_QPL6rMtvl1nkys"

describe('Test UserController', () => {
  describe('Test the fuction createUser', () => {
    it('should return status 200 and a data object', async () => {
      const req = { body: user };

      const res = {
        status: jest.fn(function () {
          return this;
        }),
        json: jest.fn(function () {
          return this;
        })
      };

      UserService.createUser = jest.fn().mockResolvedValueOnce({ id: 1, ...req.body });
      UserService.getUserByEmail = jest.fn().mockResolvedValueOnce(null);
      UserService.authenticateUser = jest.fn().mockResolvedValueOnce(token);
      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });
    it('should return status 400 and a error message when e-mail already exist', async () => {
      const req = { body: user };

      const res = {
        status: jest.fn(function () {
          return this;
        }),
        json: jest.fn(function () {
          return this;
        })
      };

      UserService.createUser = jest.fn().mockResolvedValueOnce({ status: 400, data: { mensagem: "E-mail já existente"} });

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ mensagem: "E-mail já existente"});
    });
  });
});