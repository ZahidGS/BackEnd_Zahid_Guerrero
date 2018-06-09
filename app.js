
$(document).ready(function(){
    $("select").formSelect();
    $("#mostrarTodos").click(function(){
/*             $.getJSON("data-1.json", function(result){
            $.each(result, function(i, field){
                
                $(".colContenido").append( "<div id='miContenido' class='row card'></div>");
                $("#miContenido").append( "<img src='img/home.jpg' height='100px' alt='Card image cap'>");
                $("#miContenido").append("<p>Direccion: " + field.Direccion + " </p>");
                $("#miContenido").append("<p>Ciudad: " + field.Ciudad + " </p>");
                $("#miContenido").append("<p>Telefono: " + field.Telefono + " </p>");
                $("#miContenido").append("<p>Codigo Postal: " + field.Codigo_Postal + " </p>");
                $("#miContenido").append("<p>Tipo: " + field.Tipo + " </p>");
                $("#miContenido").append("<p>Precio: " + field.Precio + " </p>");

            });
        });
*/


    $.getJSON('data-1.json', function(data){

        $.each(data, function(id,value){
            $("#selectCiudad").append('<option value="'+value.Id+'">'+value.Ciudad+'</option>');
            $("#selectTipo").append('<option value="'+value.Id+'">'+value.Tipo+'</option>');
        });
/* 
        var arrayCiudad = [];
        var arrayTipo = [];

        $.each(data, function(id,value){
            arrayCiudad.push(value.Ciudad);
            arrayTipo.push(value.Tipo);
        });

        console.log(arrayCiudad);

         var filtroCiudad = jQuery.unique(arrayCiudad);
        var filtroTipo = jQuery.unique(arrayTipo);

        $.each(filtroCiudad, function(id,value){
            $("#selectCiudad").append('<option value="'+id+'">'+value.Ciudad+'</option>');
        });
        $.each(filtroTipo, function(id,value){
            $("#selectTipo").append('<option value="'+id+'">'+value.Tipo+'</option>');
        });
 */    });
});
//alert('aki si llgo');

});

