<?php
header('Content-Type: application/json');
require 'conexao.php';

// Lê o JSON enviado pelo fetch()
$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos']);
    exit;
}

// Converte DD/MM/YYYY → YYYY-MM-DD para o banco
$partes = explode('/', $dados['nascimento']);
$nascimentoBanco = "{$partes[2]}-{$partes[1]}-{$partes[0]}";

// Extrai zona e seção do texto "Zona 001 · Seção 0042"
preg_match('/Zona (\S+)/', $dados['zona'], $mZona);
preg_match('/Seção (\S+)/', $dados['zona'], $mSecao);
$zona  = $mZona[1]  ?? '';
$secao = $mSecao[1] ?? '';

try {
    $sql = "INSERT INTO voluntarios (nome, cpf, nascimento, zona, secao, municipio)
            VALUES (:nome, :cpf, :nascimento, :zona, :secao, :municipio)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nome'       => $dados['nome'],
        ':cpf'        => $dados['cpf'],
        ':nascimento' => $nascimentoBanco,
        ':zona'       => $zona,
        ':secao'      => $secao,
        ':municipio'  => $dados['municipio'],
    ]);

    echo json_encode(['sucesso' => true]);

} catch (PDOException $e) {
    // CPF duplicado = código 23000
    if ($e->getCode() === '23000') {
        echo json_encode(['sucesso' => false, 'mensagem' => 'CPF já cadastrado no banco.']);
    } else {
        echo json_encode(['sucesso' => false, 'mensagem' => $e->getMessage()]);
    }
}