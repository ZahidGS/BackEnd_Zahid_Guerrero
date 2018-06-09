<?php

$data = file_get_contents("data-1.json");
$propiedades = json_decode($data, true);

return $propiedades;

/* 
foreach ($propiedades as $propiedad) {
    
    echo "<p>Direccion: " . $propiedad . "</p>";

    //print_r($propiedad);
}
 */

?>