const ContatoController = {
    index: function (req, res) {
        const usuario = req.session.usuario;
        if(!usuario) {
            res.redirect('/');
            return;
        }
        res.render('contatos/index', { title: 'Contatos', usuario });
    }
}

module.exports = ContatoController;