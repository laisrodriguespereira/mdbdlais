<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$dados = json_decode(file_get_contents("php://input"), true);

// Converte data de dd/mm/aaaa para aaaa-mm-dd (formato que o MySQL espera).
// Se já vier em aaaa-mm-dd, devolve sem alterar.
function converterData($data) {
    $partes = explode('/', $data);
    if (count($partes) === 3) {
        return $partes[2] . '-' . $partes[1] . '-' . $partes[0];
    }
    return $data;
}

$sql = "INSERT INTO alunos (ra_aluno, nome, data_de_nascimento, cpf, numero_da_casa, complemento, status)
        VALUES (:ra_aluno, :nome, :data_de_nascimento, :cpf, :numero_da_casa, :complemento, :status)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":ra_aluno"           => $dados["ra_aluno"],
    ":nome"               => $dados["nome"],
    ":data_de_nascimento" => converterData($dados["data_de_nascimento"]),
    ":cpf"                => $dados["cpf"],
    ":numero_da_casa"     => $dados["numero_da_casa"],
    ":complemento"        => $dados["complemento"],
    ":status"             => $dados["status"],
]);

echo json_encode(["sucesso" => true]);
?>
