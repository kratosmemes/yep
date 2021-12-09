// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    var cont = 0;
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          // alert("Complete todos los apartados");
        }
        if(form.checkValidity() === true){
          cont = cont + 1;
          // alert("XD");
        }
        if(cont == 1){
          llamarAjax();
        }
        function llamarAjax(){
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  
                  // $.ajax({
                  //     url: "http://35.167.62.109/storeutags/security/login",
                  //     type: 'POST',
                  //     contentType: 'application/json',
                  //     data: JSON.stringify({
                  //         email:$('#ema').val(),
                  //         password:$('#pass1').val(),
                  //     }),
                  //     dataType: 'json',
                  //     success: function(resp) {
                  //       if(resp.error_code == "EmailAndPasswordDoesNotMatch"){
                  //         cont = 0;
                  //         /*Captura de datos escrito en los inputs*/        
                  //         var correx = "";
                  //         var passsx = "";
                  //         /*Guardando los datos en el LocalStorage*/
                  //         localStorage.setItem("SaveCorreo", correx);
                  //         localStorage.setItem("SavePass", passsx);
                  //         alert("Usuario y/o contraseña incorrectos");
                  //         $("form")[0].reset();
                  //     }
                  //     else{
                  //         var nom = resp.data.customer.first_name;
                          // localStorage.setItem("UserName", nom);

                  //         var code = resp.data.session_id;
                  //         localStorage.setItem("UserCode", code);

                  //         alert("¡¡¡Bienvenido " + nom + "!!!");
                  //         window.location="home.html";
                  //     }
                  //     },       
                  // });

                  $.ajax({
                    type: 'POST',
                    // url: 'http://localhost:3000/login',
                    url: 'https://meserosbackfuncionando.herokuapp.com/login',
                    // data: $('form').serialize(),
                    contentType: 'application/json',
                    data: JSON.stringify({
                    email:$('#ema').val(),
                    password:$('#pass1').val(),
                }),
                dataType: 'json',
                    success: function(resp) {
                    // console.log(resp);
                    window.localStorage.setItem('token', resp.token);
                    window.localStorage.setItem('usuario_id', resp.usuario._id);
                    window.localStorage.setItem('usuario_email', resp.usuario.email);
                    window.localStorage.setItem('usuario_name', resp.usuario.nombre);
                    window.localStorage.setItem('usuario_estado', resp.usuario.estado_M);
                    window.localStorage.setItem('usuario_municipio', resp.usuario.ciudad);
                    window.localStorage.setItem('usuario_telefonico', resp.usuario.numero_telefonico);
                    // window.location.href = "homeCliente.html";
                    
                    var id = resp.usuario._id;
                    var cliente = resp.usuario.cliente;
                    // alert(''+id);
                    // if(cliente == ""){
                    //   window.location.href = "homeMesero.html";
                    // }else{
                    //   window.location.href = "homeCliente.html";
                    // }
                    
$.ajax({
type: 'GET',
// url: `http://localhost:3000/usuario/${id}/${cliente}`,
url: `https://meserosbackfuncionando.herokuapp.com/usuario/${id}/${cliente}`,
beforeSend: function(request) {
request.setRequestHeader("token", window.localStorage.getItem('token'));
},
success: function(resp) {
  // console.log(resp);
  window.location.href = "homeCliente.html";
},
error: function(err) {
// console.log(err.responseJSON.err.message);
window.location.href = "homeMesero.html";
}
});

                    },
                    error: function(err) {
                        $('#error').text(err.responseJSON.err.message);
                        $('#error').show();
                    //console.log(err.responseJSON.err.message);
                    }
                    });

                    $('input').on('focus', function(e){
                      $('#error').hide();
                      });

        }
      form.classList.add('was-validated');

      }, false);
    });
    
  }, false);
})(); 



/*Iniciar sesión por default*/
$(document).ready(function() {
  var corr = localStorage.getItem("SaveCorreo");
  var pass = localStorage.getItem("SavePass");
  var nos = localStorage.getItem("UserName");
  var nas = localStorage.getItem("UserCode");	
  function iniciarSesion(){
    if(corr == "" && pass == "" || nos == "" && nas == ""){
      //En este  apartado no pasa nada aún
      // alert("entro");
    }else{
      //window.location="homez.html";
    }
  }
  setInterval(iniciarSesion, 100);
});



function mostrarPassword(){
    var cambio = document.getElementById("pass1");
    if(cambio.type == "password"){
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
} 

$(document).ready(function () {
//CheckBox mostrar contraseña
$('#ShowPassword').click(function () {
    $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
});
});

$(function() {

  $(document).on('change','#remember',function(){
      if(this.checked) {
        guardarinicio();
      }else{
        borrarinicio();
      }
  }); 

  function guardarinicio(){
    /*Captura de datos escrito en los inputs*/        
    var corr = document.getElementById("ema").value;
    var pass = document.getElementById("pass1").value;
    /*Guardando los datos en el LocalStorage*/
    localStorage.setItem("SaveCorreo", corr);
    localStorage.setItem("SavePass", pass);
  }
  function borrarinicio(){
    /*Captura de datos escrito en los inputs*/        
    var corre = "";
    var passs = "";
    /*Guardando los datos en el LocalStorage*/
    localStorage.setItem("SaveCorreo", corre);
    localStorage.setItem("SavePass", passs);
  }
});

$(document).ready(function(){    
  $('#iniciar').click(function(){  
      window.location="login.html";
  });   
});