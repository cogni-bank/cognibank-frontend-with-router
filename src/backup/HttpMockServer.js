var http = require('http');
var url = require('url');
var qs = require( "querystring" );

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
//   //res.writeBody((person))
//   // Parse URL-encoded bodies (as sent by HTML forms)
//   const express = require('express');
//     const bodyParser = require('body-parser');
//     const app = express();
//     //app.use(express.urlencoded());

//     // Parse JSON bodies (as sent by API clients)
//     //app.use(express.json());
//     app.post('/', function(request, response){
//         console.log(request.body.user.userName);
//         console.log(request.body.user.password);
//     });
// //   var q = url.parse(req.url, true).query;
// //   var txt = q.userName + " " + q.password;
// //   console.log(txt);
//   response.end(request);
console.log("From the http mock server 1")
//console.log(request);
    if (request.method === 'OPTIONS') {
        console.log("From the inner if")
        var body = '';
        
        console.log("From the http mock server POST" +request.body)

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });
        console.log("this is the body"+body);
        request.on('end', function () {
            var post = qs.parse(body);
            console.log(request.body)
            // use post['blah'], etc.
        });
}
}).listen(8080);

