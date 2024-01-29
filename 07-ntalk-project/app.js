const express = require('express');
const consign = require('consign');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const contatosRouter = require('./routes/contatos');
const chatRouter = require('./routes/chat');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const KEY = 'ntalk.sid';
const SECRET = 'ntalk';
const store = new session.MemoryStore();
const sessOpts = { resave: false, saveUninitialized: false, secret: SECRET, key: KEY, store };
const cookie = cookieParser(SECRET);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie);
app.use(session(sessOpts));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contatos', contatosRouter);
app.use('/chat', chatRouter);

io.set('authorization', function (data, accept) {
    cookie(data, {}, function (err) {
        const sessionID = data.signedCookies[KEY];
        store.get(sessionID, function (err, session) {
            if (err || !session) {
                accept(null, false);
            } else {
                data.session = session;
                accept(null, true);
            }
        });
    });
});

consign().include('sockets').into(io);

app.use(function (req, res, next) {
    res.status(404);
    res.render('errors/not-found', { title: 'Não encontrado!' });
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('errors/server-error', {
        title: 'Erro!',
        message: err.message.replace(/[\u00A0-\u9999<>\&]/g, i => '&#' + i.charCodeAt(0) + ';')
    });
});

module.exports = { app, server };
