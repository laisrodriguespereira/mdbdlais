<?php
require_once "conexao.php";
require_once "funcoes_endereco.php";

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

try {
    $pdo->beginTransaction();

    // 1) Endereço: em vez de alterar a rua (que pode ser de outros alunos),
    //    achamos ou criamos a rua correta e apontamos o aluno para ela.
    $idRua = obterIdRua($pdo, $dados["cep"], $dados["rua"], $dados["bairro"], $dados["cidade"], $dados["uf"]);

    // 2) Contato: se o aluno já tem contato, atualiza; se não tem, cria um novo.
    $idContato = ($dados["id_contato"] ?? "") !== "" ? $dados["id_contato"] : null;

    if ($idContato !== null) {
        $stmt = $pdo->prepare("UPDATE contatos SET telefone = :telefone, email = :email
                               WHERE id_contato = :id_contato");
        $stmt->execute([
            ":telefone"   => $dados["telefone"],
            ":email"      => $dados["email"],
            ":id_contato" => $idContato,
        ]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO contatos (telefone, email) VALUES (:telefone, :email)");
        $stmt->execute([
            ":telefone" => $dados["telefone"],
            ":email"    => $dados["email"],
        ]);
        $idContato = $pdo->lastInsertId();
    }

    // 3) Aluno
    $stmt = $pdo->prepare("UPDATE alunos SET
            ra_aluno = :ra_aluno,
            nome = :nome,
            data_de_nascimento = :data_de_nascimento,
            cpf = :cpf,
            numero_da_casa = :numero_da_casa,
            complemento = :complemento,
            id_contato = :id_contato,
            id_rua = :id_rua,
            status = :status
        WHERE id_alunos = :id");
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
        ":id"                 => $dados["id"],
    ]);

    $pdo->commit();
    echo json_encode(["sucesso" => true]);
} catch (InvalidArgumentException $e) {
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
