import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import HomeScreen from './Screen/HomeScreen';
import SobreScreen from './Screen/SobreScreen';
import ConsultaAlunosScreen from './Screen/ConsultaAlunosScreen';
import CadastroAlunoScreen from './Screen/CadastroAlunoScreen';
import EditarAlunoScreen from './Screen/EditarAlunoScreen';
import ConsultaProfessoresScreen from './Screen/ConsultaProfessoresScreen';
import CadastroProfessorScreen from './Screen/CadastroProfessorScreen';
import EditarProfessorScreen from './Screen/EditarProfessorScreen';
import ConsultaTurmasScreen from './Screen/ConsultaTurmasScreen';
import CadastroTurmaScreen from './Screen/CadastroTurmaScreen';
import EditarTurmaScreen from './Screen/EditarTurmaScreen';
import ConsultaCursosScreen from './Screen/Consultacursosscreen';
import CadastroCursoScreen from './Screen/CadastroCursoScreen';
import EditarCursoScreen from './Screen/EditarCursoScreen';
import ConsultaDisciplinasScreen from './Screen/ConsultaDisciplinasScreen';
import CadastroDisciplinaScreen from './Screen/CadastroDisciplinaScreen';
import EditarDisciplinaScreen from './Screen/EditarDisciplinaScreen';
import ConsultaMatriculasScreen from './Screen/ConsultaMatriculasScreen';
import CadastroMatriculaScreen from './Screen/CadastroMatriculaScreen';
import EditarMatriculaScreen from './Screen/EditarMatriculaScreen';
import ConsultaResponsaveisScreen from './Screen/ConsultaResponsaveisScreen';
import CadastroResponsavelScreen from './Screen/CadastroResponsavelScreen';
import EditarResponsavelScreen from './Screen/EditarResponsavelScreen';
import ConsultaAvaliacoesScreen from './Screen/ConsultaAvaliacoesScreen';
import CadastroAvaliacaoScreen from './Screen/CadastroAvaliacaoScreen';
import EditarAvaliacaoScreen from './Screen/EditarAvaliacaoScreen';
import ConsultaCoordenadoresScreen from './Screen/ConsultaCoordenadoresScreen';
import CadastroCoordenadorScreen from './Screen/CadastroCoordenadorScreen';
import EditarCoordenadorScreen from './Screen/EditarCoordenadorScreen';
import ConsultaBoletinsScreen from './Screen/ConsultaBoletinsScreen';
import CadastroBoletimScreen from './Screen/CadastroBoletimScreen';
import EditarBoletimScreen from './Screen/EditarBoletimScreen';

// Endereço base da API PHP. Troque SEU_IP pelo IPv4 do seu computador (o mesmo do ipconfig).
const API_URL = "http://192.168.0.8/app_scholar_api";

const professoresIniciais = [
  {
    id_professores: '1',
    nome: 'Carlos Eduardo Lima',
    cpf: '12345678900',
    id_formacoes: '1',
    id_contato: '1',
  },
  {
    id_professores: '2',
    nome: 'Ana Paula Rodrigues',
    cpf: '98765432100',
    id_formacoes: '2',
    id_contato: '2',
  },
];

const turmasIniciais = [
  {
    id_turmas: '1',
    turno: 'Manhã',
    sala: 'Sala 10',
    ano_letivo: '2024',
    id_cursos: '1',
  },
  {
    id_turmas: '2',
    turno: 'Tarde',
    sala: 'Sala 11',
    ano_letivo: '2024',
    id_cursos: '1',
  },
];

const cursosIniciais = [
  {
    id_cursos: '1',
    nome: 'Análise e Desenvolvimento de Sistemas',
    carga_horaria: '1200',
    duracao: '3',
    descricao: 'Curso voltado para programação, banco de dados, redes e desenvolvimento de software.',
    id_coordenadores: '1',
  },
  {
    id_cursos: '2',
    nome: 'Administração',
    carga_horaria: '1000',
    duracao: '3',
    descricao: 'Curso focado em gestão empresarial, finanças e processos administrativos.',
    id_coordenadores: '2',
  },
];

const disciplinasIniciais = [
  { id_disciplinas: '1', nome: 'Lógica de Programação', carga_horaria: '80', id_cursos: '1', id_professores: '1' },
  { id_disciplinas: '2', nome: 'Algoritmos', carga_horaria: '80', id_cursos: '1', id_professores: '1' },
  { id_disciplinas: '3', nome: 'Banco de Dados', carga_horaria: '60', id_cursos: '1', id_professores: '2' },
];

const matriculasIniciais = [
  { id_matriculas: '1', id_alunos: '1', id_turmas: '1', situacao_da_matricula: 'Ativa', data_matricula: '01/02/2025' },
  { id_matriculas: '2', id_alunos: '2', id_turmas: '1', situacao_da_matricula: 'Ativa', data_matricula: '01/02/2025' },
];

const responsaveisIniciais = [
  { id_responsaveis: '1', nome: 'Maria Aparecida Silva', cpf: '30100000001', parentesco: 'Mãe', id_contato: '276' },
  { id_responsaveis: '2', nome: 'João Carlos Costa', cpf: '30100000002', parentesco: 'Pai', id_contato: '277' },
];

const avaliacoesIniciais = [
  { id_avaliacoes: '1', id_alunos: '1', id_disciplinas: '1', descricao: 'Prova 1º Bimestre', data: '15/03/2024', nota: '8.5' },
  { id_avaliacoes: '2', id_alunos: '2', id_disciplinas: '3', descricao: 'Trabalho em Grupo', data: '20/03/2024', nota: '9.0' },
];

const coordenadoresIniciais = [
  { id_coordenadores: '1', nome: 'Carlos Eduardo Lima', cpf: '12345678900', id_formacoes: '1', id_contato: '1' },
  { id_coordenadores: '2', nome: 'Ana Clara Souza', cpf: '98765432100', id_formacoes: '2', id_contato: '2' },
];

const boletinsIniciais = [
  {
    id_boletins: '1',
    id_matriculas: '1',
    media_final: '8.4',
    frequencia: '95.5',
    situacao_final: 'Aprovado',
    faltasPorDisciplina: [
      { id_boletins_disciplinas: '1', id_disciplinas: '1', faltas: '2' },
      { id_boletins_disciplinas: '2', id_disciplinas: '3', faltas: '1' },
    ],
  },
];

export default function App() {
  const [telaAtual, setTelaAtual] = useState('Home');

  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const [professores, setProfessores] = useState(professoresIniciais);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  const [turmas, setTurmas] = useState(turmasIniciais);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  const [cursos, setCursos] = useState(cursosIniciais);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const [disciplinas, setDisciplinas] = useState(disciplinasIniciais);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

  const [matriculas, setMatriculas] = useState(matriculasIniciais);
  const [matriculaSelecionada, setMatriculaSelecionada] = useState(null);

  const [responsaveis, setResponsaveis] = useState(responsaveisIniciais);
  const [responsavelSelecionado, setResponsavelSelecionado] = useState(null);

  const [avaliacoes, setAvaliacoes] = useState(avaliacoesIniciais);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(null);

  const [coordenadores, setCoordenadores] = useState(coordenadoresIniciais);
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(null);

  const [boletins, setBoletins] = useState(boletinsIniciais);
  const [boletimSelecionado, setBoletimSelecionado] = useState(null);

  const buscarAlunos = async () => {
    try {
      const resposta = await fetch(`${API_URL}/alunos.php`);
      const dados = await resposta.json();
      setAlunos(dados);
    } catch (erro) {
      console.log("Erro ao buscar alunos:", erro);
    }
  };

  useEffect(() => {
    buscarAlunos();
  }, []);

  async function adicionarAluno(novoAluno) {
    try {
      await fetch(`${API_URL}/cadastrar_aluno.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoAluno),
      });
      await buscarAlunos();
    } catch (erro) {
      console.log("Erro ao cadastrar aluno:", erro);
    }
    setTelaAtual('Alunos');
  }

  async function atualizarAluno(alunoAtualizado) {
    try {
      await fetch(`${API_URL}/editar_aluno.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alunoAtualizado),
      });
      await buscarAlunos();
    } catch (erro) {
      console.log("Erro ao editar aluno:", erro);
    }
    setTelaAtual('Alunos');
  }

  async function excluirAluno(id) {
    try {
      await fetch(`${API_URL}/excluir_aluno.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await buscarAlunos();
    } catch (erro) {
      console.log("Erro ao excluir aluno:", erro);
    }
    setTelaAtual('Alunos');
  }

  function adicionarProfessor(novoProfessor) {
    setProfessores([...professores, novoProfessor]);
    setTelaAtual('Professores');
  }

  function atualizarProfessor(professorAtualizado) {
    setProfessores(
      professores.map((p) =>
        p.id_professores === professorAtualizado.id_professores ? professorAtualizado : p
      )
    );
    setTelaAtual('Professores');
  }

  function excluirProfessor(id_professores) {
    setProfessores(professores.filter((p) => p.id_professores !== id_professores));
    setTelaAtual('Professores');
  }

  function adicionarTurma(novaTurma) {
    setTurmas([...turmas, novaTurma]);
    setTelaAtual('Turmas');
  }

  function atualizarTurma(turmaAtualizada) {
    setTurmas(
      turmas.map((t) => (t.id_turmas === turmaAtualizada.id_turmas ? turmaAtualizada : t))
    );
    setTelaAtual('Turmas');
  }

  function excluirTurma(id_turmas) {
    setTurmas(turmas.filter((t) => t.id_turmas !== id_turmas));
    setTelaAtual('Turmas');
  }

  function adicionarCurso(novoCurso) {
    setCursos([...cursos, novoCurso]);
    setTelaAtual('Cursos');
  }

  function atualizarCurso(cursoAtualizado) {
    setCursos(
      cursos.map((c) => (c.id_cursos === cursoAtualizado.id_cursos ? cursoAtualizado : c))
    );
    setTelaAtual('Cursos');
  }

  function excluirCurso(id_cursos) {
    setCursos(cursos.filter((c) => c.id_cursos !== id_cursos));
    setTelaAtual('Cursos');
  }

  function adicionarDisciplina(novaDisciplina) {
    setDisciplinas([...disciplinas, novaDisciplina]);
    setTelaAtual('Disciplinas');
  }

  function atualizarDisciplina(disciplinaAtualizada) {
    setDisciplinas(
      disciplinas.map((d) =>
        d.id_disciplinas === disciplinaAtualizada.id_disciplinas ? disciplinaAtualizada : d
      )
    );
    setTelaAtual('Disciplinas');
  }

  function excluirDisciplina(id_disciplinas) {
    setDisciplinas(disciplinas.filter((d) => d.id_disciplinas !== id_disciplinas));
    setTelaAtual('Disciplinas');
  }

  function adicionarMatricula(novaMatricula) {
    setMatriculas([...matriculas, novaMatricula]);
    setTelaAtual('Matriculas');
  }

  function atualizarMatricula(matriculaAtualizada) {
    setMatriculas(
      matriculas.map((m) =>
        m.id_matriculas === matriculaAtualizada.id_matriculas ? matriculaAtualizada : m
      )
    );
    setTelaAtual('Matriculas');
  }

  function excluirMatricula(id_matriculas) {
    setMatriculas(matriculas.filter((m) => m.id_matriculas !== id_matriculas));
    setTelaAtual('Matriculas');
  }

  function adicionarResponsavel(novoResponsavel) {
    setResponsaveis([...responsaveis, novoResponsavel]);
    setTelaAtual('Responsaveis');
  }

  function atualizarResponsavel(responsavelAtualizado) {
    setResponsaveis(
      responsaveis.map((r) =>
        r.id_responsaveis === responsavelAtualizado.id_responsaveis ? responsavelAtualizado : r
      )
    );
    setTelaAtual('Responsaveis');
  }

  function excluirResponsavel(id_responsaveis) {
    setResponsaveis(responsaveis.filter((r) => r.id_responsaveis !== id_responsaveis));
    setTelaAtual('Responsaveis');
  }

  function adicionarAvaliacao(novaAvaliacao) {
    setAvaliacoes([...avaliacoes, novaAvaliacao]);
    setTelaAtual('Avaliacoes');
  }

  function atualizarAvaliacao(avaliacaoAtualizada) {
    setAvaliacoes(
      avaliacoes.map((av) =>
        av.id_avaliacoes === avaliacaoAtualizada.id_avaliacoes ? avaliacaoAtualizada : av
      )
    );
    setTelaAtual('Avaliacoes');
  }

  function excluirAvaliacao(id_avaliacoes) {
    setAvaliacoes(avaliacoes.filter((av) => av.id_avaliacoes !== id_avaliacoes));
    setTelaAtual('Avaliacoes');
  }

  function adicionarCoordenador(novoCoordenador) {
    setCoordenadores([...coordenadores, novoCoordenador]);
    setTelaAtual('Coordenadores');
  }

  function atualizarCoordenador(coordenadorAtualizado) {
    setCoordenadores(
      coordenadores.map((c) =>
        c.id_coordenadores === coordenadorAtualizado.id_coordenadores ? coordenadorAtualizado : c
      )
    );
    setTelaAtual('Coordenadores');
  }

  function excluirCoordenador(id_coordenadores) {
    setCoordenadores(coordenadores.filter((c) => c.id_coordenadores !== id_coordenadores));
    setTelaAtual('Coordenadores');
  }

  function adicionarBoletim(novoBoletim) {
    setBoletins([...boletins, novoBoletim]);
    setTelaAtual('Boletins');
  }

  function atualizarBoletim(boletimAtualizado) {
    setBoletins(
      boletins.map((b) => (b.id_boletins === boletimAtualizado.id_boletins ? boletimAtualizado : b))
    );
    setTelaAtual('Boletins');
  }

  function excluirBoletim(id_boletins) {
    setBoletins(boletins.filter((b) => b.id_boletins !== id_boletins));
    setTelaAtual('Boletins');
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {telaAtual === 'Home' && (
          <HomeScreen
            onAbrirAlunos={() => setTelaAtual('Alunos')}
            onAbrirProfessores={() => setTelaAtual('Professores')}
            onAbrirTurmas={() => setTelaAtual('Turmas')}
            onAbrirCursos={() => setTelaAtual('Cursos')}
            onAbrirDisciplinas={() => setTelaAtual('Disciplinas')}
            onAbrirMatriculas={() => setTelaAtual('Matriculas')}
            onAbrirResponsaveis={() => setTelaAtual('Responsaveis')}
            onAbrirAvaliacoes={() => setTelaAtual('Avaliacoes')}
            onAbrirCoordenadores={() => setTelaAtual('Coordenadores')}
            onAbrirBoletins={() => setTelaAtual('Boletins')}
          />
        )}

        {telaAtual === 'Sobre' && <SobreScreen />}

        {telaAtual === 'Alunos' && (
          <ConsultaAlunosScreen
            alunos={alunos}
            onVoltar={() => setTelaAtual('Home')}
            onNovoAluno={() => setTelaAtual('CadastroAluno')}
            onEditarAluno={(aluno) => {
              setAlunoSelecionado(aluno);
              setTelaAtual('EditarAluno');
            }}
            onExcluirAluno={excluirAluno}
          />
        )}

        {telaAtual === 'CadastroAluno' && (
          <CadastroAlunoScreen
            onSalvar={adicionarAluno}
            onCancelar={() => setTelaAtual('Alunos')}
          />
        )}

        {telaAtual === 'EditarAluno' && (
          <EditarAlunoScreen
            aluno={alunoSelecionado}
            onSalvar={atualizarAluno}
            onCancelar={() => setTelaAtual('Alunos')}
            onExcluir={excluirAluno}
          />
        )}

        {telaAtual === 'Professores' && (
          <ConsultaProfessoresScreen
            professores={professores}
            onVoltar={() => setTelaAtual('Home')}
            onNovoProfessor={() => setTelaAtual('CadastroProfessor')}
            onEditarProfessor={(professor) => {
              setProfessorSelecionado(professor);
              setTelaAtual('EditarProfessor');
            }}
            onExcluirProfessor={excluirProfessor}
          />
        )}

        {telaAtual === 'CadastroProfessor' && (
          <CadastroProfessorScreen
            onSalvar={adicionarProfessor}
            onCancelar={() => setTelaAtual('Professores')}
          />
        )}

        {telaAtual === 'EditarProfessor' && (
          <EditarProfessorScreen
            professor={professorSelecionado}
            onSalvar={atualizarProfessor}
            onCancelar={() => setTelaAtual('Professores')}
            onExcluir={excluirProfessor}
          />
        )}

        {telaAtual === 'Turmas' && (
          <ConsultaTurmasScreen
            turmas={turmas}
            onVoltar={() => setTelaAtual('Home')}
            onNovaTurma={() => setTelaAtual('CadastroTurma')}
            onEditarTurma={(turma) => {
              setTurmaSelecionada(turma);
              setTelaAtual('EditarTurma');
            }}
            onExcluirTurma={excluirTurma}
          />
        )}

        {telaAtual === 'CadastroTurma' && (
          <CadastroTurmaScreen
            onSalvar={adicionarTurma}
            onCancelar={() => setTelaAtual('Turmas')}
          />
        )}

        {telaAtual === 'EditarTurma' && (
          <EditarTurmaScreen
            turma={turmaSelecionada}
            onSalvar={atualizarTurma}
            onCancelar={() => setTelaAtual('Turmas')}
            onExcluir={excluirTurma}
          />
        )}

        {telaAtual === 'Cursos' && (
          <ConsultaCursosScreen
            cursos={cursos}
            onVoltar={() => setTelaAtual('Home')}
            onNovoCurso={() => setTelaAtual('CadastroCurso')}
            onEditarCurso={(curso) => {
              setCursoSelecionado(curso);
              setTelaAtual('EditarCurso');
            }}
            onExcluirCurso={excluirCurso}
          />
        )}

        {telaAtual === 'CadastroCurso' && (
          <CadastroCursoScreen
            onSalvar={adicionarCurso}
            onCancelar={() => setTelaAtual('Cursos')}
          />
        )}

        {telaAtual === 'EditarCurso' && (
          <EditarCursoScreen
            curso={cursoSelecionado}
            onSalvar={atualizarCurso}
            onCancelar={() => setTelaAtual('Cursos')}
            onExcluir={excluirCurso}
          />
        )}

        {telaAtual === 'Disciplinas' && (
          <ConsultaDisciplinasScreen
            disciplinas={disciplinas}
            onVoltar={() => setTelaAtual('Home')}
            onNovaDisciplina={() => setTelaAtual('CadastroDisciplina')}
            onEditarDisciplina={(disciplina) => {
              setDisciplinaSelecionada(disciplina);
              setTelaAtual('EditarDisciplina');
            }}
            onExcluirDisciplina={excluirDisciplina}
          />
        )}

        {telaAtual === 'CadastroDisciplina' && (
          <CadastroDisciplinaScreen
            onSalvar={adicionarDisciplina}
            onCancelar={() => setTelaAtual('Disciplinas')}
          />
        )}

        {telaAtual === 'EditarDisciplina' && (
          <EditarDisciplinaScreen
            disciplina={disciplinaSelecionada}
            onSalvar={atualizarDisciplina}
            onCancelar={() => setTelaAtual('Disciplinas')}
            onExcluir={excluirDisciplina}
          />
        )}

        {telaAtual === 'Matriculas' && (
          <ConsultaMatriculasScreen
            matriculas={matriculas}
            alunos={alunos}
            turmas={turmas}
            onVoltar={() => setTelaAtual('Home')}
            onNovaMatricula={() => setTelaAtual('CadastroMatricula')}
            onEditarMatricula={(matricula) => {
              setMatriculaSelecionada(matricula);
              setTelaAtual('EditarMatricula');
            }}
            onExcluirMatricula={excluirMatricula}
          />
        )}

        {telaAtual === 'CadastroMatricula' && (
          <CadastroMatriculaScreen
            alunos={alunos}
            turmas={turmas}
            onSalvar={adicionarMatricula}
            onCancelar={() => setTelaAtual('Matriculas')}
          />
        )}

        {telaAtual === 'EditarMatricula' && (
          <EditarMatriculaScreen
            matricula={matriculaSelecionada}
            alunos={alunos}
            turmas={turmas}
            onSalvar={atualizarMatricula}
            onCancelar={() => setTelaAtual('Matriculas')}
            onExcluir={excluirMatricula}
          />
        )}

        {telaAtual === 'Responsaveis' && (
          <ConsultaResponsaveisScreen
            responsaveis={responsaveis}
            onVoltar={() => setTelaAtual('Home')}
            onNovoResponsavel={() => setTelaAtual('CadastroResponsavel')}
            onEditarResponsavel={(responsavel) => {
              setResponsavelSelecionado(responsavel);
              setTelaAtual('EditarResponsavel');
            }}
            onExcluirResponsavel={excluirResponsavel}
          />
        )}

        {telaAtual === 'CadastroResponsavel' && (
          <CadastroResponsavelScreen
            onSalvar={adicionarResponsavel}
            onCancelar={() => setTelaAtual('Responsaveis')}
          />
        )}

        {telaAtual === 'EditarResponsavel' && (
          <EditarResponsavelScreen
            responsavel={responsavelSelecionado}
            onSalvar={atualizarResponsavel}
            onCancelar={() => setTelaAtual('Responsaveis')}
            onExcluir={excluirResponsavel}
          />
        )}

        {telaAtual === 'Avaliacoes' && (
          <ConsultaAvaliacoesScreen
            avaliacoes={avaliacoes}
            alunos={alunos}
            disciplinas={disciplinas}
            onVoltar={() => setTelaAtual('Home')}
            onNovaAvaliacao={() => setTelaAtual('CadastroAvaliacao')}
            onEditarAvaliacao={(avaliacao) => {
              setAvaliacaoSelecionada(avaliacao);
              setTelaAtual('EditarAvaliacao');
            }}
            onExcluirAvaliacao={excluirAvaliacao}
          />
        )}

        {telaAtual === 'CadastroAvaliacao' && (
          <CadastroAvaliacaoScreen
            alunos={alunos}
            disciplinas={disciplinas}
            onSalvar={adicionarAvaliacao}
            onCancelar={() => setTelaAtual('Avaliacoes')}
          />
        )}

        {telaAtual === 'EditarAvaliacao' && (
          <EditarAvaliacaoScreen
            avaliacao={avaliacaoSelecionada}
            alunos={alunos}
            disciplinas={disciplinas}
            onSalvar={atualizarAvaliacao}
            onCancelar={() => setTelaAtual('Avaliacoes')}
            onExcluir={excluirAvaliacao}
          />
        )}

        {telaAtual === 'Coordenadores' && (
          <ConsultaCoordenadoresScreen
            coordenadores={coordenadores}
            onVoltar={() => setTelaAtual('Home')}
            onNovoCoordenador={() => setTelaAtual('CadastroCoordenador')}
            onEditarCoordenador={(coordenador) => {
              setCoordenadorSelecionado(coordenador);
              setTelaAtual('EditarCoordenador');
            }}
            onExcluirCoordenador={excluirCoordenador}
          />
        )}

        {telaAtual === 'CadastroCoordenador' && (
          <CadastroCoordenadorScreen
            onSalvar={adicionarCoordenador}
            onCancelar={() => setTelaAtual('Coordenadores')}
          />
        )}

        {telaAtual === 'EditarCoordenador' && (
          <EditarCoordenadorScreen
            coordenador={coordenadorSelecionado}
            onSalvar={atualizarCoordenador}
            onCancelar={() => setTelaAtual('Coordenadores')}
            onExcluir={excluirCoordenador}
          />
        )}

        {telaAtual === 'Boletins' && (
          <ConsultaBoletinsScreen
            boletins={boletins}
            matriculas={matriculas}
            alunos={alunos}
            turmas={turmas}
            onVoltar={() => setTelaAtual('Home')}
            onNovoBoletim={() => setTelaAtual('CadastroBoletim')}
            onEditarBoletim={(boletim) => {
              setBoletimSelecionado(boletim);
              setTelaAtual('EditarBoletim');
            }}
            onExcluirBoletim={excluirBoletim}
          />
        )}

        {telaAtual === 'CadastroBoletim' && (
          <CadastroBoletimScreen
            matriculas={matriculas}
            alunos={alunos}
            turmas={turmas}
            disciplinas={disciplinas}
            onSalvar={adicionarBoletim}
            onCancelar={() => setTelaAtual('Boletins')}
          />
        )}

        {telaAtual === 'EditarBoletim' && (
          <EditarBoletimScreen
            boletim={boletimSelecionado}
            matriculas={matriculas}
            alunos={alunos}
            turmas={turmas}
            disciplinas={disciplinas}
            onSalvar={atualizarBoletim}
            onCancelar={() => setTelaAtual('Boletins')}
            onExcluir={excluirBoletim}
          />
        )}
      </View>

      {(telaAtual === 'Home' || telaAtual === 'Sobre') && (
        <View style={styles.tabBar}>
          <Pressable style={styles.tabButton} onPress={() => setTelaAtual('Home')}>
            <Text style={[styles.tabTexto, telaAtual === 'Home' && styles.tabTextoAtivo]}>
              Home
            </Text>
          </Pressable>
          <Pressable style={styles.tabButton} onPress={() => setTelaAtual('Sobre')}>
            <Text style={[styles.tabTexto, telaAtual === 'Sobre' && styles.tabTextoAtivo]}>
              Sobre
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EF',
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabButton: { flex: 1, alignItems: 'center' },
  tabTexto: { fontSize: 13, color: '#6B7280' },
  tabTextoAtivo: { color: '#14213D', fontWeight: 'bold' },
});