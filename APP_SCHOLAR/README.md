# APP_SCHOLAR
App mobile em React Native (Expo) para gestão escolar — CRUD de alunos, professores, turmas, cursos, disciplinas, matrículas, responsáveis, avaliações, coordenadores e boletins, modelado com base em um esquema de banco de dados MySQL/MariaDB, utilizando dados simulados na versão atual da aplicação.
# APP_SCHOLAR

## Sobre o projeto

O APP_SCHOLAR é uma aplicação mobile desenvolvida para auxiliar no gerenciamento de informações acadêmicas. O sistema permite organizar e consultar dados relacionados a alunos, professores, turmas, cursos, disciplinas, matrículas, responsáveis, avaliações, coordenadores e boletins.

O projeto foi modelado com base em um esquema de banco de dados MySQL/MariaDB. O módulo de Alunos já está conectado ao banco de dados real; os demais módulos (professores, turmas, cursos, etc.) ainda utilizam dados simulados.

O objetivo do projeto é oferecer uma interface simples e organizada para centralizar informações escolares e facilitar o gerenciamento dos principais registros acadêmicos.

## Funcionalidades

* Cadastro, consulta, edição e exclusão de alunos
* Cadastro, consulta, edição e exclusão de professores
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

> No momento, apenas o módulo de Alunos está integrado ao banco de dados MySQL. Os demais módulos ainda utilizam dados simulados diretamente no código.

## Tecnologias utilizadas

React Native
JavaScript
Expo
React Native Paper
Expo Vector Icons
PHP
MySQL / MariaDB
Git
GitHub

## Estrutura do projeto

O projeto está organizado de forma a separar as telas e os arquivos principais da aplicação.

```text
appscholar/
├── app_scholar_api/
│   ├── alunos.php
│   ├── cadastrar_aluno.php
│   ├── editar_aluno.php
│   ├── excluir_aluno.php
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
├── package.json
├── .gitignore
└── README.md
```

### Principais arquivos e pastas

* **app_scholar_api/**: contém os arquivos PHP responsáveis por conectar o aplicativo ao banco de dados MySQL. O arquivo conexao.php (com as credenciais reais) não é enviado ao GitHub; conexao.exemplo.php serve como modelo de configuração.
* **App.js:** arquivo principal da aplicação, responsável pela navegação entre as telas e pelo gerenciamento dos dados.
* **Screen/:** contém as telas de consulta, cadastro e edição das diferentes informações acadêmicas.
* **assets/:** armazena imagens e recursos visuais utilizados pela aplicação, incluindo o logotipo.
* **package.json:** contém as dependências e os comandos utilizados para executar o projeto.
* **app.json:** arquivo de configuração do projeto Expo.
* **index.js:** ponto de entrada da aplicação.
* **.gitignore:** define arquivos e pastas que não devem ser enviados para o controle de versão.

## Como executar

### Pré-requisitos
- Node.js
- Expo CLI
- Um dispositivo Android/iOS com o app Expo Go, ou um emulador
- XAMPP (ou outro servidor com PHP e MySQL) rodando localmente, com o banco escolar configurado

### Passos
1. Clone o repositório:
   git clone https://github.com/laisrodriguespereira/APP_SCHOLAR.git
2. Acesse a pasta do projeto:
   cd APP_SCHOLAR
3. Instale as dependências:
   npm install
4. Inicie a aplicação:
   npm start
5. Escaneie o QR Code com o Expo Go ou pressione "w" para abrir no navegador

## Como funciona a conexão com o banco de dados

O aplicativo não acessa o banco de dados diretamente. A comunicação segue este caminho:

1. **App (React Native)** — ao abrir a tela de Alunos, é executada uma função com `fetch()` que faz uma requisição para o endereço da API em PHP, usando o IP local do computador na rede Wi-Fi.

2. **API (PHP)** — o arquivo `alunos.php` recebe essa requisição, usa o `conexao.php` para se conectar ao banco `escolar` via PDO, e executa um `SELECT` na tabela `alunos`. Como a tabela usa o campo `id_alunos` em vez de `id`, o próprio SELECT já converte esse nome (`id_alunos AS id`), entregando os dados no formato que a tela do app espera.

3. **Resposta** — os registros são retornados com `fetchAll(PDO::FETCH_ASSOC)` e convertidos em JSON com `json_encode()`.

4. **Volta ao App** — o `fetch()` recebe essa resposta, converte com `.json()`, e guarda o resultado em um estado do React com `setAlunos(dados)`. A tela recarrega automaticamente, exibindo os alunos reais do banco, em vez dos dados fixos que existiam antes.

### Observação sobre o ambiente
O projeto passou a ser executado localmente (fora do Expo Snack), com o Expo atualizado para o SDK 57 — necessário porque o Expo Go instalado no celular já estava em uma versão mais nova do que a suportada pelo Snack.

## Curso

**Desenvolvimento de Sistemas**

## Unidade

**São José dos Campos**

## Autor

**Laís Rodrigues Pereira**
