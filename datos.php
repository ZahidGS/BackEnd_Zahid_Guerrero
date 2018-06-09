<?php


/* 
Zahid Guerrero Sandoval
Desarrollo Web
Next-U

CREA ARRAY Y REGRESA LOS DATOS POR CIUDAD, TIPO O TODOS

*/



//CLASIFICA LA BUSQUEDA POR CIUDAD, TIPOS O TODOS
if( isset($_POST['tipo']) ) {
    switch ($_POST['tipo']){
        case 'ciudades':
            getCiudades();
            break;
        case 'tipos':
            getTipos();
            break;
        case 'todos':
            header('Content-type: application/json; charset=utf-8');
            echo json_encode( getData('data-1.json'),JSON_FORCE_OBJECT);
            break;
    }
} else {
    die("No se envió ningún TIPO de búsqueda.");
}



//CREA EL ARRAY CIUDADES, SELECCIONA, LO ORDENA Y LO REGRESA COMO JSON
function getCiudades(){
    $items = getData('data-1.json');
    $ciudades = array();
    foreach ($items as $key => $value) {
        array_push($ciudades,$value['Ciudad']);
    }
    $ciudades = array_unique($ciudades);
    sort($ciudades);

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($ciudades,JSON_FORCE_OBJECT);
}

//CREA EL ARRAY TIPOS, SELECCIONA, LO ORDENA Y LO REGRESA COMO JSON
function getTipos(){
    $items = getData('data-1.json');
    $tipos = array();
    foreach ($items as $key => $value) {
        array_push($tipos,$value['Tipo']);
    }
    $tipos = array_unique($tipos);
    sort($tipos);

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($tipos,JSON_FORCE_OBJECT);
}

//ABRE EL ARCHIVO, LO LEE, LO CARGA Y LO REGRESA COMO ARRAY CON TODOS LOS REGISTROS
function getData($dir){
    $data_file = fopen($dir,"r");
    $data_readed = fread($data_file, filesize($dir));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
}

?>
