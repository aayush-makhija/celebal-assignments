const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const filename = query.file;
 
  console.log(`Request received: ${method} ${pathname}`);



// Read request
  if(method === 'GET' && pathname === '/read'){
    const safePath = path.join(__dirname, filename);
    if(!filename){
        res.writeHead(400,{'Content-Type': 'text/plain'});
        res.end('Missing file query parameter.');
        return;
    }

    fs.readFile(safePath, 'utf8', (err,data) => {
        if(err){
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`File not found: ${filename}`);
            return;
        }

        res.writeHead(200, {'Content-Type' : 'text/plain'})
        res.end(data);
    });
    return;

//Create request
  } else if(method === 'POST' && pathname === '/create'){
    const content = query.content;

    if(!filename || !content){
        res.writeHead (400, { 'Content-Type': 'text/plain' });
        res.end("Missing file or 'content' parameter");
        return;
    }

    const safePath = path.join(__dirname, filename);
    fs.writeFile(safePath, content, 'utf8', (err) => {
        if(err){
            res.writeHead (500, { 'Content-Type': 'text/plain' });
            res.end('File creation failed.');
            return;
        }
        res.writeHead(201, {'Content-Type': 'text/plain'});
        res.end(`File ${filename} created successfully.`);
    });
    return;

//Delete request
  } else if(method === 'DELETE' && pathname === '/delete'){
    if(!filename){
        res.writeHead (400, { 'Content-Type': 'text/plain' });
        res.end("Missing file query parameter");
        return;
    }
    const safePath = path.join(__dirname, filename);
    fs.unlink(safePath, (err) => {
        if (err) {
            res.writeHead (404, { 'Content-Type': 'text/plain' });
            res.end('File not found.');
            return;
        }

        res.writeHead(200, {'Content-type' : 'text-plain'})
        res.end("File deletion successful")
    });
    return;

//Unknown route
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
    return
  }

});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});