const user = {
  nome: 'John Doe',
  email: 'john.doe@example.com',
  senha: '1234567',
  telefones: [{ddd: '11', numero: '987654321' }]
}

const userDatabaseCreation = {
  nome: 'John Doe',
  email: 'john.doe@example.com',
  senha: '1234567',
  dataCriacao: '2023-11-21T22:14:43.652Z',
  dataAtualizacao: '2023-11-21T22:14:43.652Z',
  ultimoLogin: '2023-11-21T22:14:43.652Z',
  telefones: [{ddd: '11', numero: '987654321' }]
}

module.exports = { user, userDatabaseCreation };