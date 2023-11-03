<?php

class ABM
{
    private $baseDeDatos;

    public function __construct(BaseDeDatos $baseDeDatos)
    {
        $this->baseDeDatos = $baseDeDatos;
    }
    public function agregar(Producto $producto)
    {
        $sql = "INSERT INTO clase24_productos (nombre, precio, cantidad) VALUES (?, ?, ?)";
        $parametros = [$producto->getNombre(), $producto->getPrecio(), $producto->getCantidad()];
        $this->baseDeDatos->ejecutarConsulta($sql, $parametros);
    }

    public function editar(Producto $producto)
    {
        $sql = "UPDATE clase24_productos SET nombre = ?, precio = ? WHERE id = ?";
        $parametros = [$producto->getNombre(), $producto->getPrecio(), $producto->getId()];
        $this->baseDeDatos->ejecutarConsulta($sql, $parametros);
    }

    public function eliminar($id)
    {
        $sql = "DELETE FROM clase24_productos WHERE id = ?";
        $parametros = [$id];
        $this->baseDeDatos->ejecutarConsulta($sql, $parametros);
    }

    public function listar()
    {
        $sql = "SELECT id, nombre, precio, cantidad FROM clase24_productos";
        return $this->baseDeDatos->ejecutarConsulta($sql);
    }
}
