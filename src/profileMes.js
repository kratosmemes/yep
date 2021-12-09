if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
    }

    $(document).ready(function(){    
        $('#close').click(function(){           
            localStorage.clear();
            window.location.href = "login.html";
        });   
    });

    var estado = 1;

    $(document).ready(function() {	
        function validarPassword(){
            $.ajax({
                type: 'POST',
                // url: 'http://localhost:3000/login',
                url: 'https://meserosbackfuncionando.herokuapp.com/login',
                // data: $('form').serialize(),
                contentType: 'application/json',
                data: JSON.stringify({
                email:localStorage.getItem("usuario_email"),
                password:$('#pass1').val(),
            }),
            dataType: 'json',
                success: function(resp) {
                  if(estado == 1){
                    $('#nombre').attr("disabled", false);
                    $('#nombre').val(resp.usuario.nombre);
                    $('#apellido').attr("disabled", false);
                    $('#apellido').val(resp.usuario.apellido_p);
                    $('#apellido2').attr("disabled", false);
                    $('#apellido2').val(resp.usuario.apellido_m);
                    $('#telefono').attr("disabled", false);
                    $('#telefono').val(resp.usuario.numero_telefonico);
                    $('#ciudad').attr("disabled", false);
                    $('#ciudad').val(resp.usuario.ciudad);
                    $('#estado').attr("disabled", false);
                    $('#estado').val(resp.usuario.estado_M);
                    $('#show_password').attr("disabled", false);
                    $('#pass1').attr("disabled", true);
                    estado = 0;
                  }
                },
                error: function(err) {
                    // $('#error').text(err.responseJSON.err.message);
                    // $('#error').show();
                //console.log(err.responseJSON.err.message);
                }
                });
        }
        if(estado == 1){
        setInterval(validarPassword, 1000);
        }
      });

      function mostrarPassword(){
        var id = localStorage.getItem("usuario_id");
        if(id == ""){
        }else{
             $.ajax({
                type: 'PUT',
                // url: `http://localhost:3000/usuario/${id}`,
                url: `https://meserosbackfuncionando.herokuapp.com/usuario/${id}`,
                // data: $('form').serialize(),
                beforeSend: function(request) {
                  request.setRequestHeader("token", window.localStorage.getItem('token'));
                  },
                contentType: 'application/json',
                  data: JSON.stringify({
                      nombre: $('#nombre').val(),
                      apellido_p:$('#apellido').val(),
                      apellido_m:$('#apellido2').val(),
                      numero_telefonico:$('#telefono').val(),
                      ciudad:$('#ciudad').val(),
                      estado_M:$('#estado').val(),
                  }),
                  dataType: 'json',
                success: function(resp) {
                // console.log(resp);
                
                window.localStorage.setItem('usuario_name', resp.usrDB.nombre);
                    window.localStorage.setItem('usuario_estado', resp.usrDB.estado_M);
                    window.localStorage.setItem('usuario_municipio', resp.usrDB.ciudad);
                    window.localStorage.setItem('usuario_telefonico', resp.usrDB.numero_telefonico);

                alert('Usuario actualizado Con Exito!');
                window.location.href = "profileMe.html";
                
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
        }
    } 

