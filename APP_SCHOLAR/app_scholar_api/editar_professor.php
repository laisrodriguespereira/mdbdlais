<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$dados = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    // 1) Formação: usa a escolhida ou, se digitaram uma nova, cria (ou reaproveita se já existir).
    $idFormacao = ($dados["id_formacoes"] ?? "") !== "" ? $dados["id_formacoes"] : null;
    $novaFormacao = trim($dados["nova_formacao"] ?? "");

    if ($novaFormacao !== "") {
        $stmt = $pdo->prepare("SELECT id_formacoes FROM formacoes WHERE formacao = :formacao");
        $stmt->execute([":formacao" => $novaFormacao]);
        $existente = $stmt->fetchColumn();

        if ($existente) {
            $idFormacao = $existente;
        } else {
            $stmt = $pdo->prepare("INSERT INTO formacoes (formacao) VALUES (:formacao)");
            $stmt->execute([":formacao" => $novaFormacao]);
            $idFormacao = $pdo->lastInsertId();
        }
    }

    // 2) Contato: se o professor já tem contato, atualiza; se não tem, cria um novo.
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

    // 3) Professor
    $stmt = $pdo->prepare("UPDATE professores SET
                               nome = :nome,
                               cpf = :cpf,
                               id_formacoes = :id_formacoes,
                               id_contato = :id_contato
                           WHERE id_professores = :id");
    $stmt->execute([
        ":nome"         => $dados["nome"],
        ":cpf"          => $dados["cpf"],
        ":id_formacoes" => $idFormacao,
        ":id_contato"   => $idContato,
        ":id"           => $dados["id_professores"],
    ]);

    $pdo->commit();
    echo json_encode(["sucesso" => true]);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(["sucesso" => false, "erro" => $e->getMessage()]);
}
?>
