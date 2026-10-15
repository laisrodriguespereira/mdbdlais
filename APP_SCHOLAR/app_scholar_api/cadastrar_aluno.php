<?php
require_once "conexao.php";
require_once "funcoes_endereco.php";

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

try {
    // Transação: ou grava tudo (endereço, contato e aluno), ou não grava nada.
    $pdo->beginTransaction();

    // 1) Endereço: acha ou cria UF, cidade, bairro e rua, e devolve o id_rua.
    $idRua = obterIdRua($pdo, $dados["cep"], $dados["rua"], $dados["bairro"], $dados["cidade"], $dados["uf"]);

    // 2) Contato: cria a linha em contatos (telefone + e-mail).
    $stmt = $pdo->prepare("INSERT INTO contatos (telefone, email) VALUES (:telefone, :email)");
    $stmt->execute([
        ":telefone" => $dados["telefone"],
        ":email"    => $dados["email"],
    ]);
    $idContato = $pdo->lastInsertId();

    // 3) Aluno: já ligado ao contato e à rua.
    $stmt = $pdo->prepare("INSERT INTO alunos
            (ra_aluno, nome, data_de_nascimento, cpf, numero_da_casa, complemento, id_contato, id_rua, status)
        VALUES
            (:ra_aluno, :nome, :data_de_nascimento, :cpf, :numero_da_casa, :complemento, :id_contato, :id_rua, :status)");
    $stmt->execute([
        ":ra_aluno"           => $dados["ra_aluno"],
        ":nome"               => $dados["nome"],
        ":data_de_nascimento" => converterData($dados["data_de_nascimento"]),
        ":cpf"                => $dados["cpf"],
        ":numero_da_casa"     => $dados["numero_da_casa"],
        ":complemento"        => $dados["complemento"],
        ":id_contato"         => $idContato,
        ":id_rua"             => $idRua,
        ":status"             => $dados["status"],
    ]);

    $pdo->commit();
    echo json_encode(["sucesso" => true]);
} catch (InvalidArgumentException $e) {
    // Erro de preenchimento (CEP, UF...): mensagem pode ser mostrada ao usuário.
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(400);
    echo json_encode(["sucesso" => false, "erro" => $e->getMessage()]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(["sucesso" => false, "erro" => "Erro ao gravar no banco de dados."]);
}
?>
