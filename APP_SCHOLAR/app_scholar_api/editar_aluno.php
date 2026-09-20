<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$dados = json_decode(file_get_contents("php://input"), true);

function converterData($data) {
    $partes = explode('/', $data);
    if (count($partes) === 3) {
        return $partes[2] . '-' . $partes[1] . '-' . $partes[0];
    }
    return $data;
}

$sql = "UPDATE alunos SET
            ra_aluno = :ra_aluno,
            nome = :nome,
            data_de_nascimento = :data_de_nascimento,
            cpf = :cpf,
            numero_da_casa = :numero_da_casa,
            complemento = :complemento,
            status = :status
        WHERE id_alunos = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":ra_aluno"           => $dados["ra_aluno"],
    ":nome"               => $dados["nome"],
    ":data_de_nascimento" => converterData($dados["data_de_nascimento"]),
    ":cpf"                => $dados["cpf"],
    ":numero_da_casa"     => $dados["numero_da_casa"],
    ":complemento"        => $dados["complemento"],
    ":status"             => $dados["status"],
    ":id"                 => $dados["id"],
]);

echo json_encode(["sucesso" => true]);
?>
