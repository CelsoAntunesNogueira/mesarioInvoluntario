<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    die(json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido. Use DELETE.']));
}

require 'conexao.php';

$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados || empty($dados['id'])) {
    http_response_code(400);
    die(json_encode(['sucesso' => false, 'mensagem' => 'ID do voluntário não fornecido']));
}

$id = (int)$dados['id'];

if ($id <= 0) {
    http_response_code(400);
    die(json_encode(['sucesso' => false, 'mensagem' => 'ID inválido']));
}

try {
    $stmt = $pdo->prepare("SELECT nome FROM voluntarios WHERE id = ?");
    $stmt->execute([$id]);
    $voluntario = $stmt->fetch();

    if (!$voluntario) {
        http_response_code(404);
        die(json_encode(['sucesso' => false, 'mensagem' => 'Voluntário não encontrado']));
    }

    $stmt = $pdo->prepare("DELETE FROM voluntarios WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        'sucesso'  => true,
        'mensagem' => 'Voluntário deletado com sucesso!',
        'id'       => $id,
        'nome'     => $voluntario['nome']
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode(['sucesso' => false, 'mensagem' => 'Erro ao deletar: ' . $e->getMessage()]));
}