if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
    }

$(document).ready(function(){    
    $('#close').click(function(){ 
        localStorage.clear();
        window.location.href = "login.html";
    });   
});

var itemId = localStorage.getItem("usuario_producto");

// function binary_decode( s ){
//   var i = 0, l = s.length, chr, out = '';
//   for( ; i < l; i += 8 ){
//       chr = parseInt( s.substr( i, 8 ), 2 ).toString( 16 );
//       out += '%' + ( ( chr.length % 2 == 0 ) ? chr : '0' + chr );
//   }
//   return decodeURIComponent( out );
// }

// var prueba = binary_decode("001101100011000100111000011000110011000101100011001101010110001100110011011001010110010000110011001100000011100100110000001100000011000100110110001101100011000000110101001100010011001100110001"
//   );
// alert(itemId+" "+prueba);
  

    $.ajax({
        type: 'GET',
        // url: `http://localhost:3000/libro/mesero/ver/${itemId}`,
        url: `https://meserosbackfuncionando.herokuapp.com/libro/mesero/ver/${itemId}`,
        beforeSend: function(request) {
        request.setRequestHeader("token", window.localStorage.getItem('token'));
        },
        success: function(resp) {
            render_items(resp);
          // console.log(resp.resp[0]);
        //   window.location.href = "homeCliente.html";
        },
        error: function(err) {
        // console.log(err.responseJSON.err.message);
        // window.location.href = "homeMesero.html";
        }
        });


        var acom = 0;
        var cont = 0;
        function render_items(resp){

            //Limpiar los productos.
            $("#divItems1").empty();
            $("#divItems2").empty();
            // $("#divConteo").empty();
        
            // xsd();
        
            //Agregarlos uno a uno.
            $.each(resp.resp, function(i, items) {
            
                cont = cont + 1;
        
              acom = acom + 1;
            if(acom >= 5){
              acom = 1;
            }
              
              //Cargar el template.
              var html_ITEM = $("#template_item").html();
        
              // Reemplazar los comentarios.
              html_ITEM = html_ITEM.replace('<!--', '');
              html_ITEM = html_ITEM.replace('-->', '');
        
              // Reemplazar los valores.
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_ID', items._id);
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_LISTA', cont);
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_LISTA2', cont);
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_LISTA3', cont);
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_LISTA4', cont);
              html_ITEM = html_ITEM.replace('ITEM_EVENTO', items.evento);
              html_ITEM = html_ITEM.replace('ITEM_DIA', items.dia);
              html_ITEM = html_ITEM.replace('ITEM_INICIO', items.inicio);
              html_ITEM = html_ITEM.replace('ITEM_TERMINO', items.termino);
              html_ITEM = html_ITEM.replace('ITEM_DESCRIPTION', items.descripcion);
              html_ITEM = html_ITEM.replace('ITEM_CANTIDAD', items.cantidad);
              html_ITEM = html_ITEM.replace('ITEM_COLONIA', items.colonia);
              html_ITEM = html_ITEM.replace('ITEM_CALLE', items.calle);
              html_ITEM = html_ITEM.replace('ITEM_EXTERIOR', items.exterior);

              if(items.interior == ""){
                var nada = "N/A";
                html_ITEM = html_ITEM.replace('ITEM_INTERIOR', nada);
              }else{
                html_ITEM = html_ITEM.replace('ITEM_INTERIOR', items.interior);
              }

              
              
              html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE', items.img);
              html_ITEM = html_ITEM.replace('ITEM_PRICE', items.paga);
        
              //Agregar el ITEM.
              $("#divItems1").append(html_ITEM);
        
            });
          }


          function addEvento(){
            
            var idEvento = localStorage.getItem("usuario_producto");
            var eventoCantidad = localStorage.getItem("usuario_producto_cantidad");
            var idMesero = localStorage.getItem("usuario_id");
            var nameMesero = localStorage.getItem("usuario_name");
            var numeroMesero = localStorage.getItem("usuario_telefonico");

            eventoCantidad = eventoCantidad - 1;

            // alert(""+numeroMesero);

            // $.ajax({
            //   type: 'GET',
            //   // url: `http://localhost:3000/prestamo/mesero/evento/${idEvento}/${idMesero}`,
            //   url: `https://waiters-browser-mx.herokuapp.com/prestamo/mesero/evento/${idEvento}/${idMesero}`,
            //   beforeSend: function(request) {
            //   request.setRequestHeader("token", window.localStorage.getItem('token'));
            //   },
            //   success: function(resp) {
            //     console.log(resp);
            //     alert("Actualmente te encuentras registrado!");
            //   },
            //   error: function(err) {
            //   // console.log(err.responseJSON.err.message);


            $.ajax({
              type: 'GET',
              // url: `http://localhost:3000/prestamo/mesero/${idMesero}`,
              url: `https://meserosbackfuncionando.herokuapp.com/prestamo/mesero/${idMesero}`,
              beforeSend: function(request) {
              request.setRequestHeader("token", window.localStorage.getItem('token'));
              },
              success: function(resp) {
              // console.log(resp);
              render_items(resp);
              },
              error: function(err) {
              // console.log(err.responseJSON.err.message);
              //----------------
              }
              });

          var status = 0;
          function render_items(resp){
          
              //Agregarlos uno a uno.
              $.each(resp.prestamos, function(i, items) {
          
              var idEvento2 = items.id_evento;

              if(idEvento == idEvento2){
                // alert("Actualmente te encuentras registrado!");
                status = 0;
              }else{
                // alert("Tú puedes registrarté!");
                // status = 1;
              }
          
              });

              if(status == 1){
                // alert("Tú puedes registrarté!");


                $.ajax({
                  type: 'PUT',
                  // url: `http://localhost:3000/libro/mesero/${idEvento}`,
                  url: `https://meserosbackfuncionando.herokuapp.com/libro/mesero/${idEvento}`,
                  // data: $('form').serialize(),
                  beforeSend: function(request) {
                    request.setRequestHeader("token", window.localStorage.getItem('token'));
                    },
                  contentType: 'application/json',
                    data: JSON.stringify({
                        cantidad: eventoCantidad
                    }),
                    dataType: 'json',
                  success: function(resp) {
                  // console.log(resp);
                  // alert('Usuario actualizado Con Exito!');
                  // window.location.href = "profileMe.html";
                  
                  $.ajax({
                    type: 'POST',
                    // url: 'http://localhost:3000/prestamo',
                    url: 'https://meserosbackfuncionando.herokuapp.com/prestamo',
                    // data: $('form').serialize(),
                    beforeSend: function(request) {
                        request.setRequestHeader("token", window.localStorage.getItem('token'));
                        },
                    contentType: 'application/json',
                      data: JSON.stringify({
                        nombre_mesero: nameMesero,
                        numero_telefonico: numeroMesero,
                        id_evento: idEvento,
                        id_mesero: idMesero
                      }),
                      dataType: 'json',
                    success: function(resp) {
                    // console.log(resp);
                    alert("Añadido con exito!");
                    window.location.href = "verEventoMesero.html";
                    },
                    error: function(err) {
                    // alert("Correo repetido o error de servidor 400");
                    $('#error').text(err.responseJSON.err.message);
                    $('#error').show();
                    }
                    });
            
                    $('input').on('focus', function(e) {
                      $('#error').hide();
                      });
    
                  //------------------
                  },
                  error: function(err) {
                  // alert("Correo repetido o error de servidor 400");
                  $('#error').text(err.responseJSON.err.message);
                  $('#error').show();
                  // console.log(err);
                  }
                  });
    
                  $('input').on('focus', function(e) {
                    $('#error').hide();
                    });


                //--------------------
              }else{
                alert("Actualmente te encuentras registrado!");
              }
            }

            


              


              //----------------
              // }
              // });

            

            //---------------------------
          }