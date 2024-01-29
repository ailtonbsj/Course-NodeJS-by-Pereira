module.exports = function (io) {
    const crypto = require('crypto');
    const sockets = io.sockets;

    io.sockets.on('connection', function (client) {
        const session = client.handshake.session;
        const usuario = session.usuario;
        client.set('email', usuario.email);

        const onlines = sockets.clients();
        onlines.forEach(online => {
            const line = sockets.sockets[online.id];
            line.get('email', function (err, email) {
                client.emit('notify-onlines', email);
                client.broadcast.emit('notify-onlines', email);
            });
        });

        client.on('disconnect', function () {
            client.get('sala', function (erro, sala) {
                const msg = "<b>" + usuario.nome + " saiu.</b><br>";
                sockets.in(sala).emit('send-client', msg);
                client.leave(sala);
            });
        });

        client.on('join', function (sala) {
            if (sala != "") {
                sala = sala.replace('?', '');
            } else {
                const timestamp = new Date().toString();
                const md5 = crypto.createHash('md5');
                sala = md5.update(timestamp).digest('hex');
            }
            client.set('sala', sala);
            client.join(sala);
            client.broadcast.emit('join', sala);
            const msg = "<b>" + usuario.nome + " entrou.</b><br>";
            sockets.in(sala).emit('send-client', msg);
        });


        client.on('send-server', function (data) {
            const msg = `<b>${usuario.nome}:</b> ${data.msg}<br>`;
            client.get('sala', function (erro, sala) {
                const data = { email: usuario.email, sala };
                client.broadcast.emit('new-message', data);
                sockets.in(sala).emit('send-client', msg);
            });
        })
    });
}