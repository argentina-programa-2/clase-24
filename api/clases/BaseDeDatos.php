<?php

class BaseDeDatos
{
    private $host;
    private $usuario;
    private $contrasena;
    private $nombreBaseDeDatos;
    private $conexion;

    public function __construct($host, $usuario, $contrasena, $nombreBaseDeDatos)
    {
        $this->host = $host;
        $this->usuario = $usuario;
        $this->contrasena = $contrasena;
        $this->nombreBaseDeDatos = $nombreBaseDeDatos;
    }

    public function conectar()
    {
        try {
            $this->conexion = new PDO(
                "mysql:host={$this->host};dbname={$this->nombreBaseDeDatos}",
                $this->usuario,
                $this->contrasena
            );

            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Error de conexión a la base de datos: " . $e->getMessage());
        }
    }

    public function ejecutarConsulta($sql, $parametros = [])
    {
        try {
            // Preparar la consulta SQL.
            $consulta = $this->conexion->prepare($sql);

            // Ejecutar la consulta con los parámetros proporcionados.
            $consulta->execute($parametros);

            // Devolver los resultados de la consulta.
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            die("Error al ejecutar la consulta: " . $e->getMessage());
        }
    }

    public function desconectar()
    {
        // Cerrar la conexión a la base de datos.
        $this->conexion = null;
    }
}
