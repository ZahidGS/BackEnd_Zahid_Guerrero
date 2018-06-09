<?php

/* 
Zahid Guerrero Sandoval
Desarrollo Web
Next-U

CREA LOS FILTROS PARA REALIZAR LA BUSQUEDA DE DATOS

 */

//INCLUYE A ARCHIVO DATOS.PHP
    require('datos.php');

//CREA VARIABLES DE COMPARACION
$ciudad = isset($_POST['selectCiudad']) ? $_POST['selectCiudad'] : '';
$tipo = isset($_POST['selectTipo']) ? $_POST['selectTipo'] : '';
$desde = isset($_POST['selectDesde']) ? $_POST['selectDesde'] : '0';
$hasta = isset($_POST['selectHasta']) ? $_POST['selectHasta'] : '100000';

//METE TODOS LOS REGISTROS A LA VARIABLE ITEMS
$items = getData('data-1.json');

$filtro = [];

$cuenta =0;

//INICIA EL CICLO DE BUSQUEDA
for($i = 0; $i < count($items); $i++){
    $item = $items[$i];
    $ciudadi = $item['Ciudad'];
    $tipoi = $item['Tipo'];    
    $precio = floatval(preg_replace('/[^\d\.]+/', '', $item['Precio']));

    //SELECCIONA LA BUSQUEDA Y REGRESA LOS DATOS EN UN ARRAY JSON
    if ($ciudad !=='' and $tipo !==''){


        if($ciudad===$ciudadi and $tipo===$tipoi and $precio>= $desde and $precio<= $hasta){
            $filtro[$cuenta] = array(
                "Id" => $item["Id"],
                "Direccion" => $item["Direccion"],
                "Ciudad" => $item["Ciudad"],
                "Telefono" => $item["Telefono"],
                "Codigo_Postal" => $item["Codigo_Postal"],
                "Tipo" => $item["Tipo"],
                "Precio" => $item["Precio"]
             );
             $cuenta +=1;
        }        
    }elseif ($ciudad !==''){
        if($ciudad===$ciudadi and $precio>= $desde and $precio<= $hasta){
            $filtro[$cuenta] = array(
                "Id" => $item["Id"],
                "Direccion" => $item["Direccion"],
                "Ciudad" => $item["Ciudad"],
                "Telefono" => $item["Telefono"],
                "Codigo_Postal" => $item["Codigo_Postal"],
                "Tipo" => $item["Tipo"],
                "Precio" => $item["Precio"]
             );
             $cuenta +=1;
        }
    }elseif ($tipo !== ''){
        if($tipo===$tipoi and $precio>= $desde and $precio<= $hasta){
            $filtro[$cuenta] = array(
                "Id" => $item["Id"],
                "Direccion" => $item["Direccion"],
                "Ciudad" => $item["Ciudad"],
                "Telefono" => $item["Telefono"],
                "Codigo_Postal" => $item["Codigo_Postal"],
                "Tipo" => $item["Tipo"],
                "Precio" => $item["Precio"]
             );
             $cuenta +=1;
        }
    }else{
        if($precio>= $desde and $precio<= $hasta){
            $filtro[$cuenta] = array(
                "Id" => $item["Id"],
                "Direccion" => $item["Direccion"],
                "Ciudad" => $item["Ciudad"],
                "Telefono" => $item["Telefono"],
                "Codigo_Postal" => $item["Codigo_Postal"],
                "Tipo" => $item["Tipo"],
                "Precio" => $item["Precio"]
             );
             $cuenta +=1;
        }
    }
 }
 header('Content-type: application/json; charset=utf-8');
 echo json_encode($filtro,JSON_FORCE_OBJECT);
?>