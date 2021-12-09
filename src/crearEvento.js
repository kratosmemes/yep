var base64image = "";
if (localStorage.getItem("token") === null) {
  window.location.href = "login.html";
}

$(document).ready(function(){    
    $('#close').click(function(){ 
        localStorage.clear();
        window.location.href = "login.html";
    });   
});

async function mostrarPassword(){
  $.ajax({
      type: 'POST',
      // url: 'http://localhost:3000/libro',
      url: 'https://meserosbackfuncionando.herokuapp.com/libro',
      // data: $('form').serialize(),
      beforeSend: function(request) {
          request.setRequestHeader("token", window.localStorage.getItem('token'));
      },
      contentType: 'application/json',
        data: JSON.stringify({
          nombre      :localStorage.getItem("usuario_name"),
          evento      :$('#evento').val(),
          descripcion :$('#descripcion').val(),
          cantidad    :$('#cantidad').val(),
          paga        :$('#paga').val(),
          dia         :$('#dia').val(),
          inicio      :$('#inicio').val(),
          termino     :$('#termino').val(),
          estado_M    :localStorage.getItem("usuario_estado"),
          ciudad      :localStorage.getItem("usuario_municipio"),
          colonia     :$('#colonia').val(),
          calle       :$('#calle').val(),
          exterior    :$('#exterior').val(),
          interior    :$('#interior').val(),
          img         :base64image,
          usuario     :localStorage.getItem("usuario_id"),
      }),
      dataType: 'json',
      success: function(resp) {
        // console.log(resp);
        alert("Evento creado con exito");
        window.location.href = "homeCliente.html";
      },
      error: function(err) {
        // alert("Correo repetido o error de servidor 400");
        //$('#error').text(err.responseJSON.err.message);
        $('#error').show();
      }
  });
  $('input').on('focus', function(e) {
    $('#error').hide();
  });
} 

// var map;
//   	 function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
// 		      center: {address: "Aguascalientes"},
//           zoom: 13,
//         });
//         var marker = new google.maps.Marker({
//           position: {address: "Aguascalientes"},
//           map: map
//         });

//     //     $("#map").googleMap();
//     // $("#map").addMarker({
//     // 	address: "15 avenue des champs Elysées 75008 Paris", // Postale Address
//     // 	url: 'http://www.tiloweb.com' // Link
//     // });

// }

var map, lat, lng;//https://mappinggis.com/2018/03/gmaps-js-una-forma-muy-facil-de-publicar-mapas-en-la-web/
    $(document).ready(function(){
      //creamos el mapa
      var map = new GMaps({
        el: '#map',
        lat: 0,
        lng: 0
      });
      // Creamos la geolocalización
      GMaps.geolocate({
        success: function(position){
          lat = position.coords.latitude;  
          lng = position.coords.longitude;
          map.setZoom(15);
          //Definimos la vista del mapa sobre las coordenadas obtenidas
          map.setCenter(lat, lng);
          //Añadimos un marcador
          map.addMarker({ lat: lat, lng: lng});  
        },
        error: function(error){
          alert('Geolocation failed: '+error.message);
        },
        not_supported: function(){
          alert("Your browser does not support geolocation");
        }
      });
    });

 





/////////////////////////////////////IMAGENES Y CAMARA////////////////////////////////
/*-----------------------------------------------------------------------------------*/
//Variables a usar
let video = document.getElementById('video');
let take_picture_button = document.getElementById('take_picture_button');
let open_take_picture_modal = document.getElementById('open_take_picture');
let input_customer_image = document.getElementById('CustomerImage');

open_take_picture_modal.addEventListener('click' , async()=>{ 
  let stream = await navigator.mediaDevices.getUserMedia({video: true}) 
  video.srcObject = stream;
});

take_picture_button.addEventListener('click' , async()=>{ 
  picture.getContext('2d').drawImage(video , 0 , 0 , picture.width , picture.height);
  let imagen_base_64 = picture.toDataURL('image/png');
  base64image =  imagen_base_64;
  console.log(base64image)
});

input_customer_image.addEventListener('change', (e)=>{
  input_customer_image = document.querySelector("#CustomerImage").files[0];
  getBase64(input_customer_image).then((result)=>{
    base64image = result;
    console.log(base64image);
  }).catch((err)=>{
    alert("Error imagen");
  });
});

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}