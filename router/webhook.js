var express = require('express');
var router = express.Router();

var baseFunction = require('../function/base');
var mensagensFunction = require('../function/mensagens.js');



router.get('/webhook', function(req, res){
 if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === global.minhasConstantes.senhaFacebook){
   console.log('validacao ok!');
   res.status(200).send(req.query['hub.challenge']);
 }
 else{
    console.log('validacao falhou!');
    res.sendStatus(403);
 }
 
})



router.post('/webhook', function(req, res){
  
  var data = req.body;
  if(data && data.object === 'page'){
    
    // PERCORRER TODAS ENTRADAS ENTRY
    data.entry.forEach(function(entry){
      var pageID = entry.id;
      var timeOfEvent = entry.time;
      
      //PERCORRER TODAS AS MENSAGENS
      entry.messaging.forEach(function(event){
        

        console.log(event);

        var senderID = event.sender.id;
        
        if(event.message){
          
          if(event.message.quick_reply){
  
          }
          
          else{
             baseFunction.tratarTexto(event);
          }
         
        }else{
          // se clicou em algum botao
          if(event.postback && event.postback.payload){
            console.log('achamos um payload ', event.postback.payload);
            switch (event.postback.payload){


              case 'menu_proximo_evento':
                 mensagensFunction.proximoEvento(event.sender.id);
                break;   
                


              case 'menu_ultimo_evento':
                 mensagensFunction.ultimoEvento(event.sender.id);
                break;    
                


              case 'menu_contato':
                 global.fbmessenger.sendTextMessage(senderID, 'Envie um e-mail para aaaaa@redeneural.com.br para entrar em contato diretamente conosco.'); 
                break;    

                
              default:  
            }
          }
          

        }
      })
      
    })
    
    res.sendStatus(200);
    
    
  }
})  



module.exports = router;