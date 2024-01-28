var express = require('express');
var router = express.Router();
var home = require('../controller/home');

router.get('/', home.index);
router.post('/entrar', home.login);
router.get('/sair', home.logout);

module.exports = router;
