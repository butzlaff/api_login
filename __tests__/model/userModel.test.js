const bcrypt = require('bcryptjs');
const prisma = require('../../src/lib/prisma.js');
const { user, userDatabaseCreation } = require('../mocks/user');
const UserModel = require('../../src/models/index');

describe('Test UserModel', () => {
  describe('Test the createUser fuction', () => {
    it('should create a user with valid input data', async () => {
      // Arrange
      prisma.tb_user.create = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation  })

      // Act
      const userCreated = await UserModel.createUser(user);

      // Assert
      expect(userCreated).toBeDefined();
      expect(userCreated.nome).toBe(userDatabaseCreation.nome);
      expect(userCreated.email).toBe(userDatabaseCreation.email);
      expect(userCreated).toMatchObject(userDatabaseCreation);
    });

    it('should return an error in case of failure', async () => {
      // Mock a failure in the create method
      prisma.tb_user.create = jest.fn().mockRejectedValue(new Error('Failed to create user'));

      // Act
      const error = await UserModel.createUser(user);

      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Failed to create user');
    });

    it('shoudl hashes the password using bcrypt', async () => {
      // Arrange
      const input = {
        nome: 'John Doe',
        email: 'john.doe@example.com',
        senha: '1234567',
        telefones: [{ number: '123456789' }]
      };

      // Mock the bcrypt.hashSync method
      bcrypt.hashSync = jest.fn();

      // Act
      UserModel.createUser(user);

      // Assert
      expect(bcrypt.hashSync).toHaveBeenCalledWith(input.senha, 10);
    });
  });
  describe('Test getByUserId function', () => {
    it('should return the user with id in database', async () => {
      prisma.tb_user.findUnique = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation });

      const userFound = await UserModel.getByUserId(1);

      expect(userFound).not.toBeNull();
      expect(userFound).toMatchObject({ id: 1, ...userDatabaseCreation });
    })
    it('should return an error in case of failure', async () => {
      // Mock a failure in the create method
      prisma.tb_user.findUnique = jest.fn().mockRejectedValue(new Error('Failed to find user'));

      // Act
      const error = await UserModel.getByUserId(999);

      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Failed to find user');
    });
  })

  describe('Test getUserByEmail function', () => {
    it('should return the user with email in database', async () => {
      prisma.tb_user.findUnique = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation });

      const userFound = await UserModel.getUserByEmail('john.doe@example.com');

      expect(userFound).not.toBeNull();
      expect(userFound).toMatchObject({ id: 1, ...userDatabaseCreation });
    });
  });

  describe('Test updateUser function', () => {
    it('should return the user with id in database', async () => {
      prisma.tb_user.update = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation });

      const userFound = await UserModel.updateUser({id: 1, ultimoLogin: '2023-11-21T22:14:43.652Z'});

      expect(userFound).not.toBeNull();

      expect(userFound).toMatchObject({ id: 1, ...userDatabaseCreation, ultimoLogin: '2023-11-21T22:14:43.652Z' });
    })  
  })
});