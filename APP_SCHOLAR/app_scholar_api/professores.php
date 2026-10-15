<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = "SELECT
            p.id_professores,
            p.nome,
            p.cpf,
            p.id_formacoes,
            p.id_contato,
            p.status,
            f.formacao,
            c.telefone,
            c.email
        FROM professores p
        LEFT JOIN formacoes f ON f.id_formacoes = p.id_formacoes
        LEFT JOIN contatos c ON c.id_contato = p.id_contato
        WHERE p.status = 'A'";

$stmt = $pdo->query($sql);
$professores = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($professores);
?>