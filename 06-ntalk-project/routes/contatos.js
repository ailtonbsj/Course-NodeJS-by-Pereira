var express = require('express');
var router = express.Router();
const autenticar = require('../middlewares/autenticador');
const contatos = require('../controller/contatos');

router.get('/', autenticar, contatos.index);
router.get('/:id', autenticar, contatos.show);
router.post('/', autenticar, contatos.create);
router.get('/:id/editar', autenticar, contatos.edit);
router.put('/:id', autenticar, contatos.update);
router.delete('/:id', autenticar, contatos.destroy);

module.exports = router;