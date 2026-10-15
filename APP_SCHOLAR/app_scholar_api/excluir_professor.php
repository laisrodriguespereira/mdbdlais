<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$dados = json_decode(file_get_contents("php://input"), true);

// Exclusão lógica: não apaga do banco, só marca como inativo.
$sql = "UPDATE professores SET status = 'I' WHERE id_professores = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":id" => $dados["id"],
]);

echo json_encode(["sucesso" => true]);
?>
