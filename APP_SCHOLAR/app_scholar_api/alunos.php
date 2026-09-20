<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = "SELECT
            id_alunos AS id,
            ra_aluno,
            nome,
            data_de_nascimento,
            cpf,
            numero_da_casa,
            complemento,
            status
        FROM alunos
        WHERE status = 'A'";

$stmt = $pdo->query($sql);
$alunos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($alunos);
?>
