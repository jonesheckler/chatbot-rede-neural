'use strict';

var request = require('request');
var funcaoMensagens = require("./mensagens");
var buttonsMenu = require("./buttons_menus");


var funcoesBase = {	
	
	tratarTexto: function (event){
	  
	  
      var senderID = event.sender.id;
      var recipientID = event.recipient.id;
      var message = event.message;

      var messageText = message.text;
      var attachments = message.attachments;
       
       if(messageText){
          
           switch(messageText.toLowerCase()){
            case "oi":
            case "olá":
            case "ola":
              //REsponder com outro oi
              global.fbmessenger.sendTextMessage(senderID, 'Oi :)');
              funcaoMensagens.mensagemApresentacao(senderID);
                    
              break;
              
            case "tchau":
              // responder com outro tchau
              global.fbmessenger.sendTextMessage(senderID, 'Tchau.');
              break;
              
            case "menu":
            case "inicio":
                buttonsMenu.menuHome(function(retorno){
                    global.fbmessenger.sendButtonsMessage(senderID, retorno.text, retorno.buttons);
                })
              break;
              
            default:
              // msg padrao
              global.fbmessenger.sendTextMessage(senderID, 'Desculpa, não entendi sua pergunta.');      
        }  
      }
      
    },
};

module.exports = funcoesBase;