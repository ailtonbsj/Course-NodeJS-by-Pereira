const ChatController = {
    index: function (req, res) {
        const result = {
            title: 'Chat',
            email: req.params.email,
            usuario: req.session.usuario
        };
        res.render('chat/index', result);
    }
}

module.exports = ChatController;