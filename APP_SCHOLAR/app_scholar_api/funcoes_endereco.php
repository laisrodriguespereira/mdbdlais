<?php
// Funções usadas por cadastrar_aluno.php e editar_aluno.php (via require_once).

// Executa um SELECT e devolve o primeiro valor da primeira linha (ou false se não achar).
function buscarId($pdo, $sql, $params) {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchColumn();
}

// Recebe os dados do endereço digitados no app e devolve o id_rua.
// A rua, o bairro, a cidade e a UF são reaproveitados se já existirem; se não existirem, são criados.
// Importante: nunca alteramos uma rua existente, porque várias pessoas podem morar nela.
function obterIdRua($pdo, $cep, $rua, $bairro, $cidade, $sigla) {
    $estados = [
        "AC" => "Acre", "AL" => "Alagoas", "AP" => "Amapá", "AM" => "Amazonas",
        "BA" => "Bahia", "CE" => "Ceará", "DF" => "Distrito Federal", "ES" => "Espírito Santo",
        "GO" => "Goiás", "MA" => "Maranhão", "MT" => "Mato Grosso", "MS" => "Mato Grosso do Sul",
        "MG" => "Minas Gerais", "PA" => "Pará", "PB" => "Paraíba", "PR" => "Paraná",
        "PE" => "Pernambuco", "PI" => "Piauí", "RJ" => "Rio de Janeiro", "RN" => "Rio Grande do Norte",
        "RS" => "Rio Grande do Sul", "RO" => "Rondônia", "RR" => "Roraima", "SC" => "Santa Catarina",
        "SP" => "São Paulo", "SE" => "Sergipe", "TO" => "Tocantins",
    ];

    $sigla  = strtoupper(trim($sigla));
    $cep    = preg_replace('/\D/', '', $cep);
    $rua    = trim($rua);
    $bairro = trim($bairro);
    $cidade = trim($cidade);

    if (!isset($estados[$sigla])) {
        throw new InvalidArgumentException("UF inválida. Use a sigla, por exemplo SP.");
    }
    if (strlen($cep) !== 8) {
        throw new InvalidArgumentException("CEP inválido. Digite os 8 números.");
    }
    if ($rua === "" || $bairro === "" || $cidade === "") {
        throw new InvalidArgumentException("Preencha rua, bairro e cidade.");
    }

    // UF
    $idUf = buscarId($pdo, "SELECT id_uf FROM uf WHERE sigla = :sigla", [":sigla" => $sigla]);
    if (!$idUf) {
        $stmt = $pdo->prepare("INSERT INTO uf (nome, sigla) VALUES (:nome, :sigla)");
        $stmt->execute([":nome" => $estados[$sigla], ":sigla" => $sigla]);
        $idUf = $pdo->lastInsertId();
    }

    // Cidade
    $idCidade = buscarId($pdo, "SELECT id_cidade FROM cidades WHERE nome = :nome AND id_uf = :uf",
        [":nome" => $cidade, ":uf" => $idUf]);
    if (!$idCidade) {
        $stmt = $pdo->prepare("INSERT INTO cidades (nome, id_uf) VALUES (:nome, :uf)");
        $stmt->execute([":nome" => $cidade, ":uf" => $idUf]);
        $idCidade = $pdo->lastInsertId();
    }

    // Bairro
    $idBairro = buscarId($pdo, "SELECT id_bairro FROM bairros WHERE nome = :nome AND id_cidade = :cidade",
        [":nome" => $bairro, ":cidade" => $idCidade]);
    if (!$idBairro) {
        $stmt = $pdo->prepare("INSERT INTO bairros (nome, id_cidade) VALUES (:nome, :cidade)");
        $stmt->execute([":nome" => $bairro, ":cidade" => $idCidade]);
        $idBairro = $pdo->lastInsertId();
    }

    // Rua
    $idRua = buscarId($pdo, "SELECT id_rua FROM ruas WHERE nome_da_rua = :rua AND cep = :cep AND id_bairro = :bairro",
        [":rua" => $rua, ":cep" => $cep, ":bairro" => $idBairro]);
    if (!$idRua) {
        $stmt = $pdo->prepare("INSERT INTO ruas (nome_da_rua, cep, id_bairro) VALUES (:rua, :cep, :bairro)");
        $stmt->execute([":rua" => $rua, ":cep" => $cep, ":bairro" => $idBairro]);
        $idRua = $pdo->lastInsertId();
    }

    return $idRua;
}
?>
