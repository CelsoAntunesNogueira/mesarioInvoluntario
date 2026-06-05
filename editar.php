<?php

header('Content-Type: application/json');
require 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método inválido'
    ]);
    exit;
}

$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Dados inválidos'
    ]);
    exit;
}

$partes = explode('/', $dados['nascimento']);
$nascimentoBanco = "{$partes[2]}-{$partes[1]}-{$partes[0]}";

try {

    $sql = "
        UPDATE voluntarios
        SET
            nome = :nome,
            nascimento = :nascimento,
            zona = :zona,
            secao = :secao,
            municipio = :municipio
        WHERE id = :id
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':nome' => $dados['nome'],
        ':nascimento' => $nascimentoBanco,
        ':zona' => $dados['zona'],
        ':secao' => $dados['secao'],
        ':municipio' => $dados['municipio'],
        ':id' => $dados['id']
    ]);

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Voluntário atualizado'
    ]);

} catch (PDOException $e) {

    echo json_encode([
        'sucesso' => false,
        'mensagem' => $e->getMessage()
    ]);
}