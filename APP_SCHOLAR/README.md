# APP_SCHOLAR
App mobile em React Native (Expo) para gestão escolar — CRUD de alunos, professores, turmas, cursos, disciplinas, matrículas, responsáveis, avaliações, coordenadores e boletins, modelado com base em um esquema de banco de dados MySQL/MariaDB, com os módulos de Alunos e Professores integrados ao banco real e os demais utilizando dados simulados na versão atual da aplicação.
# APP_SCHOLAR
 
## Sobre o projeto
 
O APP_SCHOLAR é uma aplicação mobile desenvolvida para auxiliar no gerenciamento de informações acadêmicas. O sistema permite organizar e consultar dados relacionados a alunos, professores, turmas, cursos, disciplinas, matrículas, responsáveis, avaliações, coordenadores e boletins.
 
O projeto foi modelado com base em um esquema de banco de dados MySQL/MariaDB. Na versão atual, os módulos de Alunos e Professores estão integrados ao banco de dados real e os demais módulos utilizam dados simulados.
 
O objetivo do projeto é oferecer uma interface simples e organizada para centralizar informações escolares e facilitar o gerenciamento dos principais registros acadêmicos.
 
## Funcionalidades
 
* Cadastro, consulta, edição e exclusão de alunos
* Cadastro e edição de contato (telefone e e-mail) e endereço (CEP, rua, número, complemento, bairro, cidade e UF) do aluno
* Cadastro, consulta, edição e exclusão de professores
* Cadastro e edição de telefone e e-mail do professor
* Seleção da formação do professor, com opção de cadastrar uma nova formação
* Exclusão lógica de alunos e professores: o registro não é apagado do banco, apenas marcado como inativo (status I)
* Cadastro, consulta, edição e exclusão de turmas
* Cadastro, consulta, edição e exclusão de cursos
* Cadastro, consulta, edição e exclusão de disciplinas
* Cadastro, consulta, edição e exclusão de matrículas
* Cadastro, consulta, edição e exclusão de responsáveis
* Cadastro, consulta, edição e exclusão de avaliações
* Cadastro, consulta, edição e exclusão de coordenadores
* Cadastro, consulta, edição e exclusão de boletins
* Consulta das informações cadastradas
* Navegação entre as principais telas da aplicação
* Visualização de informações acadêmicas, como notas, frequência e situação final
* Tela inicial com acesso às principais áreas do sistema
* Tela de informações sobre a aplicação
> No momento, os módulos de Alunos e Professores estão integrados ao banco de dados MySQL. Os demais módulos ainda utilizam dados simulados diretamente no código.
 
## Tecnologias utilizadas
 
React Native
JavaScript
Expo
Expo Vector Icons
PHP
MySQL / MariaDB
Git
GitHub
 
## Estrutura do projeto
 
O projeto está organizado de forma a separar as telas e os arquivos principais da aplicação.
 
```text
APP_SCHOLAR/
├── app_scholar_api/
│   ├── alunos.php
│   ├── cadastrar_aluno.php
│   ├── editar_aluno.php
│   ├── excluir_aluno.php
│   ├── funcoes_endereco.php
│   ├── professores.php
│   ├── cadastrar_professor.php
│   ├── editar_professor.php
│   ├── excluir_professor.php
│   ├── formacoes.php
│   ├── teste_conexao.php
│   └── conexao.exemplo.php
│
├── assets/
│   ├── logo.png
│
├── Screen/
│   ├── HomeScreen.js
│   ├── SobreScreen.js
│   ├── ConsultaAlunosScreen.js
│   ├── CadastroAlunoScreen.js
│   ├── EditarAlunoScreen.js
│   ├── ConsultaProfessoresScreen.js
│   ├── CadastroProfessorScreen.js
│   ├── EditarProfessorScreen.js
│   ├── ConsultaTurmasScreen.js
│   ├── CadastroTurmaScreen.js
│   ├── EditarTurmaScreen.js
│   ├── Consultacursosscreen.js
│   ├── CadastroCursoScreen.js
│   ├── EditarCursoScreen.js
│   ├── ConsultaDisciplinasScreen.js
│   ├── CadastroDisciplinaScreen.js
│   ├── EditarDisciplinaScreen.js
│   ├── ConsultaMatriculasScreen.js
│   ├── CadastroMatriculaScreen.js
│   ├── EditarMatriculaScreen.js
│   ├── ConsultaResponsaveisScreen.js
│   ├── CadastroResponsavelScreen.js
│   ├── EditarResponsavelScreen.js
│   ├── ConsultaAvaliacoesScreen.js
│   ├── CadastroAvaliacaoScreen.js
│   ├── EditarAvaliacaoScreen.js
│   ├── ConsultaCoordenadoresScreen.js
│   ├── CadastroCoordenadorScreen.js
│   ├── EditarCoordenadorScreen.js
│   ├── ConsultaBoletinsScreen.js
│   ├── CadastroBoletimScreen.js
│   └── EditarBoletimScreen.js
│
├── App.js
├── index.js
├── app.json
├── dicionario_dados.pdf
├── escolar.sql
├── modelagem_escolar.brM3
├── package.json
├── .gitignore
├── videos_app_scholar.txt
└── README.md
```
 
### Principais arquivos e pastas
 
* **app_scholar_api/**: contém os arquivos PHP responsáveis por conectar o aplicativo ao banco de dados MySQL (módulos de Alunos e Professores, além da lista de formações). O arquivo funcoes_endereco.php reúne a função que localiza ou cria UF, cidade, bairro e rua, usada no cadastro e na edição de alunos. O arquivo conexao.php (com as credenciais reais) não é enviado ao GitHub; conexao.exemplo.php serve como modelo de configuração.
* **App.js:** arquivo principal da aplicação, responsável pela navegação entre as telas, pelo gerenciamento dos dados e pelas chamadas à API (fetch). O endereço da API fica na constante API_URL, no início do arquivo.
* **Screen/:** contém as telas de consulta, cadastro e edição das diferentes informações acadêmicas.
* **assets/:** armazena imagens e recursos visuais utilizados pela aplicação, incluindo o logotipo.
* **package.json:** contém as dependências e os comandos utilizados para executar o projeto.
* **app.json:** arquivo de configuração do projeto Expo.
* **dicionario_dados.pdf:** dicionário de dados do banco escolar, com a descrição das tabelas e dos campos.
* **escolar.sql:** SQL com a criação das tabelas e dos dados do banco escolar, para ser importado no MySQL/MariaDB.
* **modelagem_escolar.brM3:** modelagem do banco escolar, feita no BrModelo.
* **index.js:** ponto de entrada da aplicação.
* **videos_app_scholar.txt:** contém o link do Google Drive com os vídeos explicativos sobre o app.
* **.gitignore:** define arquivos e pastas que não devem ser enviados para o controle de versão.
## Como executar
 
### Pré-requisitos
- Node.js
- Expo CLI
- Um dispositivo Android/iOS com o app Expo Go, ou um emulador
- XAMPP (ou outro servidor com PHP e MySQL) instalado no computador
### Passos
1. Clone o repositório:
   git clone https://github.com/laisrodriguespereira/APP_SCHOLAR.git
2. Acesse a pasta do projeto:
   cd APP_SCHOLAR
3. Instale as dependências:
   npm install
4. Abra o XAMPP, inicie o Apache e o MySQL e importe o arquivo escolar.sql pelo phpMyAdmin (aba Importar). O banco se chama escolar.sql
5. Na pasta app_scholar_api/, copie conexao.exemplo.php para conexao.php e preencha com os dados do seu banco (servidor, nome do banco, usuário e senha)
6. Copie a pasta app_scholar_api/ para a pasta htdocs do XAMPP
7. Descubra o endereço IP do computador na rede Wi-Fi (no Windows, use o comando ipconfig) e configure-o no endereço da API utilizado pelo aplicativo, na constante API_URL do App.js. O IP pode mudar quando o computador reconecta ao Wi-Fi; se aparecer o erro "Host unreachable", atualize o endereço.
8. Inicie a aplicação:
   npm start
9. Escaneie o QR Code com o Expo Go (celular e computador na mesma rede Wi-Fi) ou pressione "w" para abrir no navegador
## Como funciona a conexão com o banco de dados
 
O aplicativo não acessa o banco de dados diretamente. A comunicação segue este caminho:
 
1. **App (React Native)** — ao abrir o aplicativo, são executadas funções com `fetch()` (`buscarAlunos`, `buscarProfessores` e `buscarFormacoes`) que fazem requisições para o endereço da API em PHP, usando o IP local do computador na rede Wi-Fi.
2. **API (PHP)** — o arquivo `alunos.php` recebe essa requisição, usa o `conexao.php` para se conectar ao banco `escolar` via PDO, e executa um `SELECT` na tabela `alunos`, trazendo também o contato e o endereço do aluno por meio de `LEFT JOIN` com as tabelas `contatos`, `ruas`, `bairros`, `cidades` e `uf`. Somente alunos com `status = 'A'` (ativos) são retornados. Como a tabela usa o campo `id_alunos` em vez de `id`, o próprio SELECT já converte esse nome (`id_alunos AS id`), entregando os dados no formato que a tela do app espera. O arquivo `professores.php` funciona da mesma forma, trazendo a formação (tabela `formacoes`), o telefone e o e-mail (tabela `contatos`) de cada professor ativo.
3. **Resposta** — os registros são retornados com `fetchAll(PDO::FETCH_ASSOC)` e convertidos em JSON com `json_encode()`.
4. **Volta ao App** — o `fetch()` recebe essa resposta, converte com `.json()`, e guarda o resultado em um estado do React com `setAlunos(dados)` (ou `setProfessores(dados)`). A tela recarrega automaticamente, exibindo os registros reais do banco, em vez dos dados fixos que existiam antes.
### Cadastro, edição e exclusão
 
As operações de escrita usam `fetch()` com o método POST e os dados em JSON. Os arquivos PHP utilizam `prepare()` e `execute()` e rodam dentro de uma transação: se alguma etapa falhar, nada é gravado pela metade. Depois de cada operação, o app consulta a API novamente para atualizar a lista.
 
* **Cadastrar (`cadastrar_aluno.php` e `cadastrar_professor.php`):** grava primeiro as tabelas relacionadas e depois o registro principal. No aluno, o endereço é resolvido por `funcoes_endereco.php`, que reaproveita UF, cidade, bairro e rua já existentes ou cria os que não existirem, e em seguida é criado o contato (telefone e e-mail). No professor, é criado o contato e a formação escolhida; se for digitada uma formação nova, ela é criada na tabela `formacoes` (ou reaproveitada, se já existir).
* **Editar (`editar_aluno.php` e `editar_professor.php`):** atualiza o contato (telefone e e-mail) e o registro principal. No endereço do aluno, a rua existente nunca é alterada, pois pode ser compartilhada por outros alunos: o sistema localiza ou cria a rua correta e apenas aponta o aluno para ela.
* **Excluir (`excluir_aluno.php` e `excluir_professor.php`):** é uma exclusão lógica. Em vez de `DELETE`, o arquivo executa um `UPDATE` que marca o registro como inativo (`status = 'I'`). O registro continua no banco, e as consultas exibem apenas os registros ativos.
### Observação sobre o ambiente
O projeto passou a ser executado localmente (fora do Expo Snack), com o Expo atualizado para o SDK 57 — necessário porque o Expo Go instalado no celular já estava em uma versão mais nova do que a suportada pelo Snack.
 
## Curso
 
**Desenvolvimento de Sistemas**

## Unidade

**São José dos Campos**

## Autor

**Laís Rodrigues Pereira**
