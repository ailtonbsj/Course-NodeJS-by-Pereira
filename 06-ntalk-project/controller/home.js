const HomeController = {
    index: function (req, res, next) {
        res.render('index', { title: 'Login' });
    },
    login: function(req, res){
        var email = req.body.email;
        var nome = req.body.nome;
        if(email && nome) {
            var usuario = {email, nome};
            usuario['contatos'] = [];
            req.session.usuario = usuario;
            res.redirect('/contatos');
        } else {
            res.redirect('/');
        }
    },
    logout: function(req, res){
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = HomeController;