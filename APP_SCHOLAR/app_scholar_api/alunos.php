<?php
require_once "conexao.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$sql = "SELECT
            a.id_alunos AS id,
            a.ra_aluno,
            a.nome,
            a.data_de_nascimento,
            a.cpf,
            a.numero_da_casa,
            a.complemento,
            a.status,
            a.id_contato,
            a.id_rua,
            c.telefone,
            c.email,
            r.cep,
            r.nome_da_rua AS rua,
            b.nome AS bairro,
            ci.nome AS cidade,
            u.sigla AS uf
        FROM alunos a
        LEFT JOIN contatos c ON c.id_contato = a.id_contato
        LEFT JOIN ruas r ON r.id_rua = a.id_rua
        LEFT JOIN bairros b ON b.id_bairro = r.id_bairro
        LEFT JOIN cidades ci ON ci.id_cidade = b.id_cidade
        LEFT JOIN uf u ON u.id_uf = ci.id_uf
        WHERE a.status = 'A'";

$stmt = $pdo->query($sql);
$alunos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($alunos);
?>
