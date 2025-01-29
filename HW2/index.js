'use strict'
import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies

// send static file as response
app.get('/', (req,res) => {
    res.type('text/html');
    res.sendFile('.public/index.html');
  });
  
  // send plain text response
  app.get('/about', (req,res) => {
   res.type('text/plain');
   res.send('About page');
  });
  

  app.get('/user/:name', (req,res) => {
    res.type('text/plain');
    res.send(`Your name is ${req.params.name}`);
  });
  

  // define 404 handler
  app.use((req,res) => {
   res.type('text/plain'); 
   res.status(404);
   res.send('404 - Not found');
  });

  app.listen(app.get('port'), () => {
    console.log('Express started'); 
  });

/*
import http from 'http';
http.createServer((req,res) => {
    var path = req.url.toLowerCase();    
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home page');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }    
}).listen(process.env.PORT || 3000);
*/