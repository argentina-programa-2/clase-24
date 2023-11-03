<?php
include("./clases/ABM.php");
include("./clases/BaseDeDatos.php");
include("./clases/Producto.php");

$db = new BaseDeDatos("localhost", "c1582153_ap", "33seGOvose", "c1582153_ap");
$db->conectar();
$abm = new ABM($db);


header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    echo json_encode($abm->listar());
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $producto = new Producto($data['nombre'], $data['precio'], $data['cantidad']);
    echo json_encode($abm->agregar($producto));
    header("HTTP/1.1 200 OK");
    exit();
}


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = key($_GET);
    $producto = new Producto($data['nombre'], $data['precio'], $data['cantidad'], $id);


    echo json_encode($abm->editar($producto));
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $id = key($_GET);
    echo json_encode($abm->eliminar($id));
    header("HTTP/1.1 200 OK");
    exit();
}
$db->desconectar();
