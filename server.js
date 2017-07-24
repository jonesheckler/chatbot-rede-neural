//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');


var FBMessenger = require('fb-messenger');

var messenger = new FBMessenger("");  // TOKEN DO WEBHOOK CRIADO

global.fbmessenger = messenger;



var router = express();
var server = http.createServer(router);


router.use(express.static(path.resolve(__dirname, 'client')));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// Webhook
router.use(require('./router/webhook'));



global.minhasConstantes = {};
global.minhasConstantes.senhaFacebook = '';  // chave do webhook




// Webhook
router.use(require('./router/webhook'));



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Rodando em ", addr.address + ":" + addr.port);
});
