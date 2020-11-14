const http = require("http");
const server = http.createServer(function(req, res){
    res.writeHead(200, {'content-type':'text/html'});
    res.end('<h1>Hola mundo que tal</h1>');
});
server.listen(4000);