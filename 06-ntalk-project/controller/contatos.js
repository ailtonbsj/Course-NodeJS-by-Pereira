const ContatoController = {
    index: function (req, res) {
        const usuario = req.session.usuario;
        res.render('contatos/index', { title: 'Contatos', usuario });
    },
    edit: function (req, res) {
        const usuario = req.session.usuario;
        var contato = usuario.contatos[req.params.id];
        if (!contato) {
            res.redirect('/');
            return;
        }
        res.render('contatos/edit', { title: 'Editar contato', usuario, id: req.params.id, contato });
    },
    show: function (req, res) {
        const contato = req.session.usuario.contatos[req.params.id];
        if (!contato) {
            res.redirect('/');
            return;
        }
        res.render('contatos/show', { title: 'Detalhes do contato', contato });
    },
    create: function (req, res) {
        var nome = req.body.nome;
        var email = req.body.email;
        req.session.usuario.contatos.push({ nome, email });
        res.redirect('/contatos');
    },
    update: function (req, res) {
        var nome = req.body.nome;
        var email = req.body.email;
        var id = req.params.id;
        req.session.usuario.contatos[id] = {nome, email};
        res.redirect('/contatos');
    },
    destroy: function (req, res) {
        const usuario = req.session.usuario;
        var id = req.params.id;
        usuario.contatos.splice(id, 1);
        res.redirect('/contatos');
    }
}

module.exports = ContatoController;