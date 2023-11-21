const bcrypt = require('bcryptjs');
const UserModel = require('../../src/models/index');
const prisma = require('../../src/lib/prisma.js');
const user = require('../mocks/user');
const returnUser = require('../mocks/returnUser.js');

describe('createUser', () => {
  it('should create a user with valid input', async () => {
    prisma.tb_user.create = jest.fn().mockResolvedValueOnce(returnUser);

    await UserModel.createUser({ ...user });

    expect(returnUser).toBeDefined();
    expect(returnUser.nome).toEqual('John Doe');
    expect(returnUser.email).toEqual('john.doe@example.com');
    expect(returnUser.telefones.length).toBe(1);
    expect(returnUser.telefones[0].numero).toEqual(987654321);
    expect(returnUser.telefones[0].ddd).toEqual(11);
  });

  it('should return an error if user creation fails', async () => {
    // Mocking the error response
    const error = new Error('Failed to create user');
    prisma.tb_user.create = jest.fn().mockRejectedValueOnce(error);

    const result = await UserModel.createUser({ ...user });

    expect(result).toBe(error);
  });
});