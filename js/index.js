$(function (){


/* 
Zahid Guerrero Sandoval
Desarrollo Web
Next-U

CONTROLA LAS BUSQUEDAS Y MUESTRA LOS DATOS EN EL ARCHIVO HTML

 */


    /*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
    $.fn.scrollEnd = function(callback, timeout) {
        $(this).scroll(function(){
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,timeout));
        });
    };

    /*
    Función que inicializa el elemento Slider
    */
    function inicializarSlider() {
        $("#rangoPrecio").ionRangeSlider({
            type: "double",
            grid: false,
            min: 0,
            max: 100000,
            from: 500,
            to: 80000,
            prefix: "$"
        });
    }

    /*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
    function playVideoOnScroll(){
        var ultimoScroll = 0,
            intervalRewind;
        var video = document.getElementById('vidFondo');
        $(window)
            .scroll((event)=>{
            var scrollActual = $(window).scrollTop();
        if (scrollActual > ultimoScroll){
            video.play();
        } else {
            //this.rewind(1.0, video, intervalRewind);
            video.play();
        }
        ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
            video.pause();
    }, 10)
    }


    //INICIA VARIABLES COMO SELECTOR DE ELEMENTOS
    var ciudades = $("#selectCiudad");
    var tipos = $("#selectTipo");
    var resultado = $("#resultado");



    function cargarCiudades(){

        $.ajax({
            url: 'datos.php',
            type: 'POST',
            data: 'tipo=ciudades',
            success: function(data, textStatus, jqXHR) {
                ciudades.find('option').remove();
                ciudades.append('<option value="" selected>Elige una ciudad</option>');
                $.each(data, function (id,value){
                    ciudades.append('<option value="'+value+'">'+value+'</option>');

                });
                $('select').material_select();
            },
            error: function(data, textStatus, errorThrown) {
                console.log('message=:' + data + ', text status=:' + textStatus + ', error thrown:=' + errorThrown);
            }
        });
    }

    function cargarTipos(){

        $.ajax({
            url: 'datos.php',
            type: 'POST',
            data: 'tipo=tipos',
            success: function(data, textStatus, jqXHR) {
                tipos.find('option').remove();
                tipos.append('<option value="" selected>Elige un tipo</option>');
                $.each(data, function (id,value){
                    tipos.append('<option value="'+value+'">'+value+'</option>');
                });
                $('select').material_select();
            },
            error: function(data, textStatus, errorThrown) {
                console.log('message=:' + data + ', text status=:' + textStatus + ', error thrown:=' + errorThrown);
            }
        });
    }


    $("#mostrarTodos").click(function () {
       resultado.find('div').remove();

        $.ajax({
            url: 'datos.php',
            type: 'POST',
            data: 'tipo=todos',
            success: function(data, textStatus, jqXHR) {
                $.each(data, function (id,value){
                   var insertar=
                   "<div class='card itemMostrado'>" +
                   "<div class='card-image'  style='width:50%;'><img src='img/home.jpg'/></div>" +
                       "<div class='card-stacked'>" +
                       "<div class='card-content'>" +
                       "<div><strong>Direccion: </strong>"+ value['Direccion'] +"</div>" +
                       "<div><strong>Ciudad: </strong>"+value['Ciudad']+"</div>" +
                       "<div><strong>Telefono: </strong>"+value['Telefono']+"</div>" +
                       "<div><strong>Código postal: </strong>"+value['Codigo_Postal']+"</div>" +                       
                       "<div><strong>Tipo: </strong>"+value['Tipo']+"</div>" +
                       "<div class='precioTexto'><strong>Precio: </strong>"+value['Precio']+"</div>" +
                       "</div>" +
                       "<div class='card-action' >" +
                       "<a href='#'>Ver mas</a> " +
                       "</div>" +
                       "</div>" +                      
                    "</div>";
                   resultado.append(insertar);
                });
            },
            error: function(data, textStatus, errorThrown) {
                console.log('message=:' + data + ', text status=:' + textStatus + ', error thrown:=' + errorThrown);
            }
        });
    });

    var request;

    $("#formulario").submit(function(event)
    {

        event.preventDefault();
        if (request) {
            request.abort();
        }
        var $form = $(this);
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();
        var postForm = {
            'selectCiudad' : $('select[name=ciudad]').val(),
            'selectTipo' : $('select[name=tipo]').val(),
            'selectDesde': $('#rangoPrecio').data().from,
            'selectHasta': $('#rangoPrecio').data().to,
            'tipo': 'filtro'
        };
        $inputs.prop("disabled", true);
        resultado.find('div').remove();
        $.ajax({
            url: 'buscador.php',
            type: 'POST',
            data: postForm,
            success: function(data, textStatus, jqXHR) {                
                $.each(data, function (id,value){
                   var insertar=
                    "<div class='card itemMostrado'>" +
                       "<div class='card-image'  style='width:50%;'><img src='img/home.jpg'/></div>" +
                       "<div class='card-stacked'>" +
                       "<div class='card-content'>" +
                       "<div><strong>Direccion: </strong>"+ value['Direccion'] +"</div>" +
                       "<div><strong>Ciudad: </strong>"+value['Ciudad']+"</div>" +
                       "<div><strong>Telefono: </strong>"+value['Telefono']+"</div>" +
                       "<div><strong>Código postal: </strong>"+value['Codigo_Postal']+"</div>" +                       
                       "<div><strong>Tipo: </strong>"+value['Tipo']+"</div>" +
                       "<div class='precioTexto'><strong>Precio: </strong>"+value['Precio']+"</div>" +
                       "</div>" +
                       "<div class='card-action'>" +
                       "<a href='#'>Ver mas</a> " +
                       "</div>" +
                       "</div>" +                      
                    "</div>";
                   resultado.append(insertar);                 
                });
                $inputs.prop("disabled", false);
            },
            error: function(data, textStatus, errorThrown) {
                console.log('message=:' + data + ', text status=:' + textStatus + ', error thrown:=' + errorThrown);
                $inputs.prop("disabled", false);
            }
        });
        $inputs.prop("disabled", false);

    });
    
    $(function () {
        $('select').material_select();
        inicializarSlider();       
        cargarCiudades();
        cargarTipos();
     });
});




