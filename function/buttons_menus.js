'use strict';


 function menuHome(callback){
     
      var buttons = [
             
                  {
                    type: 'postback',
                    title: 'Último Evento',
                    payload: 'menu_ultimo_evento'
                  },
                  {
                    type: 'postback',
                    title: 'Próximo Evento',
                    payload: 'menu_proximo_evento'
                  },
                  {
                    type: 'postback',
                    title: 'Contato',
                    payload: 'menu_contato'
                  },
                ];
                
        var text = 'Escolha uma das opções abaixo:';       
        
        setTimeout(function(){
            callback( {
                buttons: buttons,
                text: text,
            });
        }, 2500);    
 }
 
 

 

 
 module.exports = {
  menuHome: menuHome,
};