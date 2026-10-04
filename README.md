# Repositório de Banco de Dados

Repositório com as atividades e trabalhos desenvolvidos durante o curso Técnico em **Desenvolvimento de Sistemas** na **ETEC de São José dos Campos**, reunindo as atividades de modelagem, o projeto de banco de dados escolar e o aplicativo **APP_SCHOLAR**.

**Autora:** Laís Rodrigues Pereira

---

## 🗂️ Estrutura do Repositório

```
mdbdlais/
├── APP_SCHOLAR/          # Aplicativo mobile (3º bimestre)
├── MDBD/                 # Documentação do banco de dados escolar
├── atividadebd3/         # Primeira versão do banco escolar (2º bimestre)
├── modelagem/            # Atividade avaliativa de modelagem (2º bimestre)
└── README.md
```

| Pasta | Conteúdo | Bimestre |
|-------|----------|----------|
| [`APP_SCHOLAR`](./APP_SCHOLAR) | Aplicativo mobile escolar | 3º |
| [`MDBD`](./MDBD) | Documento, dicionário de dados, SQL e modelagem do banco escolar atual | 3º |
| [`atividadebd3`](./atividadebd3) | Primeira versão do banco escolar | 2º |
| [`modelagem`](./modelagem) | Exercícios de relacionamentos e chaves | 2º |

---

## APP_SCHOLAR

Aplicativo mobile em **React Native (Expo)** para gestão escolar, com CRUD de alunos, professores, turmas, cursos, disciplinas, matrículas, responsáveis, avaliações, coordenadores e boletins. Foi modelado com base em um esquema de banco de dados **MySQL/MariaDB**.

>  **Estado atual:** o módulo de **Alunos** já está integrado ao banco de dados real (via API em PHP). Os demais módulos ainda utilizam **dados simulados** no código.

| Item | Descrição |
|------|-----------|
| `Screen/` | Telas de consulta, cadastro e edição de cada módulo |
| `app_scholar_api/` | API em PHP que conecta o app ao banco MySQL (módulo de Alunos) |
| `assets/` | Imagens e recursos visuais, incluindo o logotipo |
| `App.js` | Arquivo principal: navegação entre telas e gerenciamento dos dados |
| `index.js` | Ponto de entrada da aplicação |
| `app.json` / `package.json` | Configurações do Expo, dependências e comandos |
| `escolar.sql` | Script do banco de dados utilizado |
| `modelagem_escolar.brM3` | Modelagem do banco escolar (BrModelo) |
| `dicionario_dados.pdf` | Dicionário de dados do banco escolar |
| `videos_app_scholar.txt` | Link do Drive com os vídeos explicativos do app |

Mais detalhes (funcionalidades, como funciona a conexão com o banco, etc.) no [README do APP_SCHOLAR](./APP_SCHOLAR/README.md).

---

##  MDBD

Pasta com a documentação do **banco de dados escolar** em sua versão atual, o mesmo utilizado no APP_SCHOLAR.

| Arquivo | Descrição |
|---------|-----------|
| `DOCUMENTO.pdf` | Documento explicando como o banco de dados escolar foi pensado e desenvolvido |
| `dicionario_dados.pdf` | Dicionário de dados, com a descrição das tabelas e campos |
| `escolar.sql` | Script SQL do banco escolar (versão atual) |
| `modelagem_escolar.brM3` | Modelagem do banco escolar (versão atual), feita no BrModelo |
| `videos_app_scholar.txt` | Link do Drive com o vídeo em que explico o APP_SCHOLAR |

---

## atividadebd3

Contém o banco de dados escolar em sua **primeira versão**, criado no 2º bimestre.

| Arquivo | Descrição |
|---------|-----------|
| `escolar.sql` | SQL da primeira versão do banco escolar |

> Serve como registro da evolução do projeto, podendo ser comparado com a versão atual na pasta `MDBD`.

---

## modelagem

Atividade avaliativa do 2º bimestre, na introdução da matéria de Banco de Dados. O enunciado pedia:

> **Definir os relacionamentos e também os campos chaves para cada um dos exercícios citados a seguir:**
>
> 1. Alunos, Matrículas, Boletins, Cursos, Professores, Coordenadores, Disciplinas.
> 2. Clientes, Vendas, Produtos, Fornecedores, Pagamentos.
> 3. Bairros, Cidades, Estados, Ruas, Continentes, Países.
> 4. Atletas, Equipes, Competições, Treinadores, Partidas.
> 5. Hóspedes, Reservas, Diárias, Pagamentos, Serviços Adicionais, Hotéis.
> 6. Locações, Veículos, Clientes, Reservas, Pagamentos, Manutenções.
> 7. Atores, Filmes, Diretores, Premiações, Indicações (para premiações).
> 8. Assinantes, Assinaturas, Planos, Pagamentos.
> 9. Colaboradores, Setores, Projetos, Entregas.
> 10. Prontuários, Médicos, Pacientes, Receitas, Medicações, Tratamentos.

Cada exercício foi modelado em um arquivo do **BrModelo**:

| Arquivo | Tema do exercício |
|---------|-------------------|
| `exercicio1.brM3` | Escola: Alunos, Matrículas, Boletins, Cursos, Professores, Coordenadores, Disciplinas |
| `exercicio2.brM3` | Comércio: Clientes, Vendas, Produtos, Fornecedores, Pagamentos |
| `exercicio3.brM3` | Geografia: Bairros, Cidades, Estados, Ruas, Continentes, Países |
| `exercicio4.brM3` | Esportes: Atletas, Equipes, Competições, Treinadores, Partidas |
| `exercicio5.brM3` | Hotelaria: Hóspedes, Reservas, Diárias, Pagamentos, Serviços Adicionais, Hotéis |
| `exercicio6.brM3` | Locadora de veículos: Locações, Veículos, Clientes, Reservas, Pagamentos, Manutenções |
| `exercicio7.brM3` | Cinema: Atores, Filmes, Diretores, Premiações, Indicações |
| `exercicio8.brM3` | Assinaturas: Assinantes, Assinaturas, Planos, Pagamentos |
| `exercicio9.brM3` | Gestão de projetos: Colaboradores, Setores, Projetos, Entregas |
| `exercicio10.brM3` | Saúde: Prontuários, Médicos, Pacientes, Receitas, Medicações, Tratamentos |

---


## 🛠️ Tecnologias e Ferramentas

- **React Native** e **Expo**
- **JavaScript**
- **React Native Paper** e **Expo Vector Icons**
- **PHP** (API de conexão com o banco)
- **MySQL / MariaDB**
- **BrModelo** (modelagem conceitual e lógica)
- **Git e GitHub**

---

## 🎬 Vídeo explicativo

O link do vídeo em que apresento e explico o APP_SCHOLAR está no arquivo `videos_app_scholar.txt` (nas pastas `MDBD` e `APP_SCHOLAR`).

---

## Contexto

Todos os conteúdos deste repositório são **atividades e trabalhos acadêmicos** realizados no curso de **Desenvolvimento de Sistemas** da **ETEC de São José dos Campos**.
