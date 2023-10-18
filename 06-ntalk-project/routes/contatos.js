var express = require('express');
var router = express.Router();
const contatos = require('../controller/contatos');

router.get('/', contatos.index);
router.get('/:id', contatos.show);
router.post('/', contatos.create);
router.get('/:id/editar', contatos.edit);
router.put('/:id', contatos.update);
router.delete('/:id', contatos.destroy);

module.exports = router;