'use strict'

import * as Cars from "./data/data.js";
import { Car } from './models/Car.js'; // for HW3
import express from 'express';
import cors from 'cors';

const app = express();

app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

app.set('port', process.env.PORT || 3000);
//app.use(express.static('./public')); // set location for static files
app.use(express.static('public')); // set location for static files
app.use(express.urlencoded()); //Parse URL-encoded bodies

// set the view engine to ejs
app.set('view engine', 'ejs');

// send content of 'home' view to browser
app.get('/', (req,res) => {
//  res.render('home', {cars: Cars.getAll()});
Car.find({}).lean()
  .then((cars) => {
  //  console.log(cars);
    res.render('home', {cars});
  })
  .catch(err => console.log(err));
});

app.get('/api/cars', (req,res) => {
  Car.find({}).lean()
    .then((cars) => {
      res.json(cars);
      //console.log(cars);
      //res.render('home', {cars});
    })
    .catch(err => {res.status(500).send('Database Error occurred');
    })
});


// send content of 'home' view
//app.get('/detail', (req,res) => {
 // let result = Cars.getItem(model);
 // let result = Cars.getItem(req.query.model);
 // res.render('details', {
 //   model: req.query.model, 
 //   model: model,
 //   result: result }
 // );
 //});

 app.get('/detail', (req,res,next) => {
  // db query can use request parameters
  Car.findOne({ model:req.query.model }).lean()
      .then((car) => {
//            console.log(car);
          res.render('details', {result: car} );
      })
      .catch(err => next(err));
});

// e.g. http://localhost:3000/api/cars/miata
app.get('/api/cars/:model', (req,res) => {
  const model = req.params.model;
//app.get('/api/cars/:color', (req,res) => {
//Car.findOne({ model:req.params.model }).lean()
Car.find({ model: { $regex: `^${model}$`, $options: 'i' } })  //MongoDB native approach
//Car.find({ model: new RegExp(`^${model}$`, 'i') })  //JavaScript RegExp Construtor
      .then((car) => {
         res.json(car);
      })
      .catch(err => {
          res.status(500).send('Database Error occurred');
      });
});

// send static file as response
//app.get('/', (req,res) => {
//    res.type('text/html');
//    res.sendFile('.public/index.html');
 // });
  
  // send plain text response
  app.get('/about', (req,res) => {
   res.type('text/plain');
   res.send('About page');
  });
  

  app.get('/user/:name', (req,res) => {
    res.type('text/plain');
    res.send(`Your name name is ${req.params.name}`);
  });
  
  app.get('/foo', (req,res,next) => {
    if(Math.random() < 0.5) return next();
    res.send('sometimes this');
  });
  app.get('/foo', (req,res) => {
    res.send('and sometimes that');
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