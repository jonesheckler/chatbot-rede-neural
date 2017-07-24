'use strict';


var buttonsMenu = require("./buttons_menus");
var request = require("request");
var moment = require('moment');

moment.locale('pt-BR');
    
    // envio da apresentacao
    function mensagemApresentacao (recipientId){
      
       global.fbmessenger.getProfile(recipientId, function (err, result) {
          if(err) return console.error(err)
          
          else{
            
              var messageText = 'Olá '+result.first_name+' '+result.last_name+'. Vou apresentar um menu inicial com algumas opções ;)';
              global.fbmessenger.sendTextMessage(recipientId, messageText);
              
              setTimeout(function(){
              
                 buttonsMenu.menuHome(function(retorno){
                     global.fbmessenger.sendButtonsMessage(recipientId, retorno.text, retorno.buttons);
                })
              
              },2000);
              
              
          }
        
       });
    }
    



    function proximoEvento (recipientId){

        var url = "https://api.meetup.com/Rede-Neural/events?&sign=true&photo-host=public&scroll=next_upcoming&page=1"

        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                //console.log(body[0]);
                var resposta = body[0]; // Print the json response
                var dia = moment(resposta.time).format('DD MMMM YYYY, h:mm a');
                var messageText = 'O próximo evento é '+resposta.name+' e será realizado em '+dia+' ;)';
                global.fbmessenger.sendTextMessage(recipientId, messageText);
               

                setTimeout(function(){
              
                    var messageText2 = 'Olhe toda a descrição do evento:  '+resposta.description;
                    global.fbmessenger.sendTextMessage(recipientId, messageText2);
                
                },2000);


                setTimeout(function(){
              
                    var messageText3 = 'Veja mais aqui: '+resposta.link;
                    global.fbmessenger.sendTextMessage(recipientId, messageText3);
                
                },4000);
                
            }
        })

    }



    function ultimoEvento(recipientId){
     // https://api.meetup.com/Rede-Neural/events?&sign=true&photo-host=public&scroll=recent_past&page=1
      var url = "https://api.meetup.com/Rede-Neural/events?&sign=true&photo-host=public&scroll=recent_past&page=1"

        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log(body[0]);
                var resposta = body[0]; // Print the json response
                var dia = moment(resposta.time).format('DD MMMM YYYY, h:mm a');
                var messageText = 'O último evento foi '+resposta.name+', realizado em '+dia+' ;)';
                global.fbmessenger.sendTextMessage(recipientId, messageText);
              


                setTimeout(function(){
              
                    var messageText3 = 'Veja mais aqui: '+resposta.link;
                    global.fbmessenger.sendTextMessage(recipientId, messageText3);
                
                },2000);

                
            }
        })

    }
    
    
    
  


module.exports = {
  mensagemApresentacao: mensagemApresentacao,
  proximoEvento:proximoEvento,
  ultimoEvento:ultimoEvento,
};