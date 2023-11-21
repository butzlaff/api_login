const { createUser } = require('../../src/controllers/User.controller');
const {UserService} = require('../../src/services/index');
const user = require('../mocks/user');

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

      UserService.createUser = jest.fn().mockResolvedValueOnce({ status: 200, data: { id: 1, ...req.body } });

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
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