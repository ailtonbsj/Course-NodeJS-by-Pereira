var http = require('http');
var fs = require('fs');

var server = http.createServer(function (request, response) {
   response.writeHead(200, { "Content-Type": "text/html" });

   fs.readFile('./pagina.html', function (erro, arquivo) {
      if (erro) throw erro;
      response.write(arquivo.toString('utf8'));
      response.end();
   });

});

server.listen(3000, function () {
   console.log("Servidor rodando!");
});
