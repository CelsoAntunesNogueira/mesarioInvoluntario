<?php
$host   = 'localhost';
$db     = 'mesario_db';
$user   = 'root';         // troque por um usuário dedicado em produção
$senha  = 'sua_senha';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$opcoes = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $senha, $opcoes);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}