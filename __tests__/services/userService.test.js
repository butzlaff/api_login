const { UserService } = require('../../src/services/index');
const { user, userDatabaseCreation } = require('../mocks/user');
const UserModel = require('../../src/models/index');
const bcrypt = require('bcryptjs');
const token = require('../../src/auth/auth');

const createToken  = jest.createMockFromModule('../../src/auth/auth');

describe('Test UserService', () => {
  describe('Test the createUser fuction', () => {
    it('should return the user created in database', async () => {
      UserModel.createUser = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      const userCreated = await UserService.createUser(user);

      expect(userCreated).toMatchObject({ id: 1, ...userDatabaseCreation});
      expect(userCreated).not.toBeNull();

    });
    it('should return null if e-mail is invalid', async () => {
      UserModel.createUser = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      const userCreated = await UserService.createUser({ ...user, email: 'john.doe-example.com'});

      expect(userCreated).toBeNull();

    });
  });
  describe('Test the getByUserId fuction', () => {
    it('should return the user with id in database', async () => {
      UserModel.getByUserId = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      const userFound = await UserService.getByUserId(1);
      expect(userFound).not.toBeNull();
      expect(userFound).toMatchObject({ id: 1, ...userDatabaseCreation});
    })

    it('should return null if not have user with id', async () => {
      UserModel.getByUserId = jest.fn().mockResolvedValueOnce(null);
      const userFound = await UserService.getByUserId(1);

      expect(userFound).toBeNull();
    })
  });
  describe('Test the getUserByEmail fuction', () => {
    it('should return the user with email in database', async () => {
      UserModel.getUserByEmail = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});
      const userFound = await UserService.getUserByEmail('john.doe@example.com');
      expect(userFound).not.toBeNull();
      expect(userFound).toMatchObject({ id: 1, ...userDatabaseCreation});
    })

    it('should return null if email not exists', async () => {
      const userFound = await UserService.getUserByEmail();
      expect(userFound).toBeNull();
    })
  })
  describe('Test the autehnticateUser fuction', () => {
    it('should return user and token if sucessful', async () => {
      const email = 'john.doe@example.com';
      const password = 'password123';
      const passSwordEncript = bcrypt.hashSync(password, 10)

      UserModel.updateUser = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation, senha: passSwordEncript });
      UserModel.getUserByEmail = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation, senha: passSwordEncript});

      token.createToken = jest.fn().mockResolvedValue('token');
      const userFound = await UserService.authenticateUser(email, password);
      
      expect(userFound).not.toBeNull();
      expect(token.createToken).toHaveBeenCalled()     
      expect(userFound).toBe('token')    
    })
    it('should return null if user not exists', async () => {
      const email = 'john.doe@example.com';
      const password = 'password123';
      const passSwordEncript = bcrypt.hashSync(password, 10)

      UserModel.updateUser = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation, senha: passSwordEncript });
      UserModel.getUserByEmail = jest.fn().mockResolvedValueOnce(null);

      token.createToken = jest.fn().mockResolvedValue('token');
      const userFound = await UserService.authenticateUser(email, password);
      
      expect(userFound).toBeNull();    
    })

    it('should return null if password is not the same', async () => {
      const email = 'john.doe@example.com';
      const password = 'password123';

      UserModel.getUserByEmail = jest.fn().mockResolvedValueOnce({ id: 1, ...userDatabaseCreation});

      token.createToken = jest.fn().mockResolvedValue('token');
      const userFound = await UserService.authenticateUser(email, password);
      
      expect(userFound).toBeNull();  
    })
  });
});