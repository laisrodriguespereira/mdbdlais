<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$dados = json_decode(file_get_contents("php://input"), true);

// Exclusão lógica: o aluno some da lista do app (status vira 'I'),
// mas continua existindo de verdade no banco de dados.
$sql = "UPDATE alunos SET status = 'I' WHERE id_alunos = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":id" => $dados["id"],
]);

echo json_encode(["sucesso" => true]);
?>
