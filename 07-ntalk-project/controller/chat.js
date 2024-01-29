const ChatController = {
    index: function (req, res) {
        const result = {
            title: 'Chat',
            email: req.params.email,
            room: req.query.s
        };
        res.render('chat/index', result);
    }
}

module.exports = ChatController;