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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contatos', contatosRouter);
app.use('/chat', chatRouter);

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
