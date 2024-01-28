const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/autenticador');
const chat = require('../controller/chat');

router.get('/:email', autenticar, chat.index);

module.exports = router;
