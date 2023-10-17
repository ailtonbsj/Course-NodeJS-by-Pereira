var http = require('http');
var fs = require('fs');

var server = http.createServer(function (request, response) {
   response.writeHead(200, { "Content-Type": "text/html" });
   var arquivo = fs.readFileSync(__dirname + '/pagina.html');
   response.write(arquivo.toString('utf8'));
   response.end();
});

server.listen(3000, function () {
   console.log("Servidor rodando!");
});
