const cors = require('cors');
const express = require('express');
const { usersRouter } = require('./routes');
const { ErrorHandler } = require('./middlewares/ErrorHanlder');

const app = express();

const accessControl = (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
'Access-Control-Allow-Methods',
    'GET, POST, DELETE, OPTIONS, PUT, PATCH',
);
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(express.json());

app.use(cors());

app.use(accessControl);

app.use('/users', usersRouter);

app.use(ErrorHandler);

// Rota para verificação se a API está online.
app.get('/', (_req, res) => res.status(200).json({ message: 'OK' }));

app.use('/*', (_req, res) => res.status(404).json('mensagem \'Rota não encontrada\''));

module.exports = app;
