var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../models');
const userService = require('../services/userService');
const UserService = new userService(db.User);

const userController = require('../controllers/userController');
const UserController = new userController(UserService);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Modulo de usuario está funcionando');
});

// Rota para criar um novo usuário
router.post('/novoUsuario', async function(req, res, next) {
  const { nome, email, senha } = req.body;
  try {
    UserController.create(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir o novo usuário' });
  }
});

router.get('/localizarUsuarioPeloLogin', function(req, res, next) { 
  UserController.localizarUsuarioPeloLogin(req,res);
});

router.get('/localizarUsuarioPeloId', function(req, res, next) { 
  UserController.localizarUsuarioPeloId(req,res);
});

module.exports = router;
