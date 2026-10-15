<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = "SELECT id_formacoes, formacao FROM formacoes ORDER BY formacao";

$stmt = $pdo->query($sql);
$formacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($formacoes);
?>
