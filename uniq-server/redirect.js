
var http = require('http')
var url = require('url')

http.createServer((req, res) => {
    var path = url.parse(req.url).pathname
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url })
    res.end()
}).listen(8080)

