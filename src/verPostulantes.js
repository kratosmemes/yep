if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
    }

$(document).ready(function(){    
    $('#close').click(function(){ 
        localStorage.clear();
        window.location.href = "login.html";
    });   
});

var idEvento = localStorage.getItem("usuario_producto");

// alert(""+idEvento);

$.ajax({
type: 'GET',
// url: `http://localhost:3000/prestamo/${idEvento}`,
url: `https://meserosbackfuncionando.herokuapp.com/prestamo/${idEvento}`,
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

var cont = 0;
function render_items(resp){

    //Limpiar los productos.
    $("#divItems1").empty();

    //Agregarlos uno a uno.
    $.each(resp.prestamos, function(i, items) {
    
        cont = cont + 1;
      
      //Cargar el template.
      var html_ITEM = $("#template_item").html();

      // Reemplazar los comentarios.
      html_ITEM = html_ITEM.replace('<!--', '');
      html_ITEM = html_ITEM.replace('-->', '');

      // Reemplazar los valores.
      html_ITEM = html_ITEM.replace('ITEM_ORDER', cont);
      html_ITEM = html_ITEM.replace('ITEM_NOMBRE', items.nombre_mesero);
      html_ITEM = html_ITEM.replace('ITEM_TELEFONO', items.numero_telefonico);

      //Agregar el ITEM.
      $("#divItems1").append(html_ITEM);

    });
  }