if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
    }

    $(document).ready(function(){    
        $('#close').click(function(){ 
            localStorage.clear();
            window.location.href = "login.html";
        });   
    });

    $("#divItems1").empty();
    $("#divItems2").empty();

    var idMesero = localStorage.getItem("usuario_id");

    // alert(""+idEvento);
    
    $.ajax({
    type: 'GET',
    // url: `http://localhost:3000/prestamo/mesero/${idMesero}`,
    url: `https://meserosbackfuncionando.herokuapp.com/prestamo/mesero/${idMesero}`,
    beforeSend: function(request) {
    request.setRequestHeader("token", window.localStorage.getItem('token'));
    },
    success: function(resp) {
    console.log(resp);
    render_items(resp);
    },
    error: function(err) {
    // console.log(err.responseJSON.err.message);
    //----------------
    }
    });

function render_items(resp){

    //Agregarlos uno a uno.
    $.each(resp.prestamos, function(i, items) {

    var idEvento = items.id_evento;

    $.ajax({
        type: 'GET',
        // url: `http://localhost:3000/libro/mesero/ver/aceptado/${idEvento}`,
        url: `https://meserosbackfuncionando.herokuapp.com/libro/mesero/ver/aceptado/${idEvento}`,
        beforeSend: function(request) {
        request.setRequestHeader("token", window.localStorage.getItem('token'));
        },
        success: function(resp) {
        console.log(resp);
        render_items2(resp);
        },
        error: function(err) {
        // console.log(err.responseJSON.err.message);
        //----------------
        }
        });

    });
  }


  var acom = 0;
        var cont = 0;
        function render_items2(resp){

            //Limpiar los productos.
            // $("#divItems1").empty();
            // $("#divItems2").empty();
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

              //https://www.it-swarm-es.com/es/javascript/convertir-binario-texto-usando-javascript/1043960819/

              // var aBinario = parseInt(""+items._id).toString(2);

              //https://wordcodepress.com/convertir-texto-binario-javascript/
              

        //       function binary_encode( s ){
        //         s = unescape( encodeURIComponent( s ) );
        //         var chr, i = 0, l = s.length, out = '';
        //         for( ; i < l; i ++ ){
        //             chr = s.charCodeAt( i ).toString( 2 );
        //             while( chr.length % 8 != 0 ){ chr = '0' + chr; }
        //             out += chr;
        //         }
        //         return out;
        //  }
         
        //  var prueba = binary_encode(items._id);
        //  alert(cont);
        
              // Reemplazar los valores.
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_ID', items._id);
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_LISTA', cont);
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_LISTA2', cont);
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_LISTA3', cont);
              html_ITEM = html_ITEM.replace('ITEM_PRODUCT_LISTA4', cont);
              html_ITEM = html_ITEM.replace('ITEM_EVENTO', items.evento);
              html_ITEM = html_ITEM.replace('ITEM_DIA', items.dia);
              html_ITEM = html_ITEM.replace('ITEM_INICIO', items.inicio);
              html_ITEM = html_ITEM.replace('ITEM_DESCRIPTION', items.descripcion);

              var cantidad = items.cantidad;
              html_ITEM = html_ITEM.replace('ITEM_CANTIDAD', cantidad);
              
              html_ITEM = html_ITEM.replace('ITEM_SMALL_IMAGE', items.img);
              html_ITEM = html_ITEM.replace('ITEM_PRICE', items.paga);
        
              //Agregar el ITEM.
              if(acom == 1 || acom == 3){
                //Agregar el ITEM.
                $("#divItems1").append(html_ITEM);
                }
                if(acom == 2 || acom == 4){
                //Agregar el ITEM.
                $("#divItems2").append(html_ITEM);
                }
        
            });
          }

    /*Guardar el ID y comprobar que realmente se guardo, para despues mostrar producto */
function dataItemId(lista){

    var productId = $("#"+lista).val();
    var cantidad = $("#c"+lista).val();

    localStorage.setItem("usuario_producto", productId);
    localStorage.setItem("usuario_producto_cantidad", cantidad);

    var prueba = localStorage.getItem("usuario_producto");

    // alert(""+cantidad);

    if(prueba == ""){

    }else{
      // alert(" " + prueba);
      window.location.href="verMisEventoMesero.html";
    }
  }