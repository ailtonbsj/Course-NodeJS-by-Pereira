var express = require('express');
var router = express.Router();
const contatos = require('../controller/contatos');

router.get('/', contatos.index);

module.exports = router;