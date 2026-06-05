<?php

header('Content-Type: application/json');
require 'conexao.php';

try {

    $sql = "SELECT 
                id,
                nome,
                cpf,
                nascimento AS data_nascimento,
                zona,
                secao,
                municipio
            FROM voluntarios
            ORDER BY id DESC";

    $stmt = $pdo->query($sql);

    $voluntarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'sucesso' => true,
        'total' => count($voluntarios),
        'dados' => $voluntarios
    ]);

} catch (PDOException $e) {

    echo json_encode([
        'sucesso' => false,
        'mensagem' => $e->getMessage(),
        'total' => 0,
        'dados' => []
    ]);
}