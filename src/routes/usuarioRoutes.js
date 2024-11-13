const express = require('express');
const { getUsuarios, addUsuario, login } = require('../controllers/usuarioController');
const router = express.Router();

router.get('/usuarios', getUsuarios);
router.post('/usuarios', addUsuario);
router.post('/login', login); // Adiciona a rota de login

module.exports = router;
