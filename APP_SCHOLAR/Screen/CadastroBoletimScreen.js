import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Campos mapeados para o banco `escolar`:
// - id_matriculas -> boletins.id_matriculas
// - media_final   -> boletins.media_final
// - frequencia    -> boletins.frequencia
// - situacao_final -> boletins.situacao_final
// - faltasPorDisciplina[] -> boletins_disciplinas (id_boletins + id_disciplinas + faltas),
//   um boletim pode ter faltas lançadas em várias disciplinas
export default function CadastroBoletimScreen({ matriculas, alunos, turmas, disciplinas, onSalvar, onCancelar }) {
  const [matriculaSelecionada, setMatriculaSelecionada] = useState(null);
  const [mediaFinal, setMediaFinal] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [situacaoFinal, setSituacaoFinal] = useState('Aprovado');
  const [faltasPorDisciplina, setFaltasPorDisciplina] = useState([]);

  const [modalMatriculaVisivel, setModalMatriculaVisivel] = useState(false);
  const [buscaMatricula, setBuscaMatricula] = useState('');

  const [modalDisciplinaVisivel, setModalDisciplinaVisivel] = useState(false);
  const [buscaDisciplina, setBuscaDisciplina] = useState('');
  const [disciplinaTemp, setDisciplinaTemp] = useState(null);
  const [faltasTemp, setFaltasTemp] = useState('');

  function nomeAluno(id_alunos) {
    const aluno = alunos.find((a) => a.id === id_alunos);
    return aluno ? aluno.nome : 'Aluno não encontrado';
  }

  function infoTurma(id_turmas) {
    const turma = turmas.find((t) => t.id_turmas === id_turmas);
    return turma ? `${turma.turno} • ${turma.sala}` : 'Turma não encontrada';
  }

  function nomeDisciplina(id_disciplinas) {
    const disciplina = disciplinas.find((d) => d.id_disciplinas === id_disciplinas);
    return disciplina ? disciplina.nome : 'Disciplina não encontrada';
  }

  const matriculasFiltradas = matriculas.filter((m) =>
    nomeAluno(m.id_alunos).toLowerCase().includes(buscaMatricula.toLowerCase())
  );
  const disciplinasFiltradas = disciplinas.filter((d) =>
    d.nome.toLowerCase().includes(buscaDisciplina.toLowerCase())
  );

  function adicionarFalta() {
    if (!disciplinaTemp || !faltasTemp) {
      alert('Selecione a disciplina e informe as faltas');
      return;
    }
    setFaltasPorDisciplina([
      ...faltasPorDisciplina,
      { id_boletins_disciplinas: Date.now().toString(), id_disciplinas: disciplinaTemp.id_disciplinas, faltas: faltasTemp },
    ]);
    setDisciplinaTemp(null);
    setFaltasTemp('');
  }

  function removerFalta(id_boletins_disciplinas) {
    setFaltasPorDisciplina(
      faltasPorDisciplina.filter((f) => f.id_boletins_disciplinas !== id_boletins_disciplinas)
    );
  }

  function salvar() {
    if (!matriculaSelecionada || !mediaFinal || !frequencia || !situacaoFinal) {
      alert('Preencha todos os campos obrigatórios (*)');
      return;
    }

    const novoBoletim = {
      id_boletins: Date.now().toString(),
      id_matriculas: matriculaSelecionada.id_matriculas,
      media_final: mediaFinal,
      frequencia,
      situacao_final: situacaoFinal,
      faltasPorDisciplina,
    };

    onSalvar(novoBoletim);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Novo Boletim</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Matrícula *</Text>
        <Pressable style={styles.seletor} onPress={() => setModalMatriculaVisivel(true)}>
          <Text style={matriculaSelecionada ? styles.seletorTexto : styles.seletorPlaceholder}>
            {matriculaSelecionada
              ? `${nomeAluno(matriculaSelecionada.id_alunos)} • ${infoTurma(matriculaSelecionada.id_turmas)}`
              : 'Selecione a matrícula'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </Pressable>

        <Text style={styles.label}>Média Final *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: 8.4"
          keyboardType="decimal-pad"
          value={mediaFinal}
          onChangeText={setMediaFinal}
        />

        <Text style={styles.label}>Frequência (%) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: 95.5"
          keyboardType="decimal-pad"
          value={frequencia}
          onChangeText={setFrequencia}
        />

        <Text style={styles.label}>Situação Final *</Text>
        <View style={styles.situacaoContainer}>
          {['Aprovado', 'Reprovado', 'Recuperação'].map((opcao) => (
            <Pressable
              key={opcao}
              style={[styles.situacaoBotao, situacaoFinal === opcao && styles.situacaoBotaoAtivo]}
              onPress={() => setSituacaoFinal(opcao)}
            >
              <Text style={[styles.situacaoTexto, situacaoFinal === opcao && styles.situacaoTextoAtivo]}>
                {opcao}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Faltas por disciplina (opcional)</Text>
        <View style={styles.faltaForm}>
          <Pressable style={styles.seletor} onPress={() => setModalDisciplinaVisivel(true)}>
            <Text style={disciplinaTemp ? styles.seletorTexto : styles.seletorPlaceholder}>
              {disciplinaTemp ? disciplinaTemp.nome : 'Selecione a disciplina'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </Pressable>
          <View style={styles.faltaLinha}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Nº de faltas"
              keyboardType="numeric"
              value={faltasTemp}
              onChangeText={setFaltasTemp}
            />
            <Pressable style={styles.botaoAdicionarFalta} onPress={adicionarFalta}>
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {faltasPorDisciplina.map((item) => (
          <View key={item.id_boletins_disciplinas} style={styles.faltaItem}>
            <Text style={styles.faltaItemTexto}>
              {nomeDisciplina(item.id_disciplinas)} — {item.faltas} falta(s)
            </Text>
            <Pressable onPress={() => removerFalta(item.id_boletins_disciplinas)}>
              <Ionicons name="trash" size={18} color="#DC2626" />
            </Pressable>
          </View>
        ))}

        <View style={styles.botoes}>
          <Pressable style={styles.botaoCancelar} onPress={onCancelar}>
            <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.botaoSalvar} onPress={salvar}>
            <Ionicons name="save-outline" size={18} color="#FFFFFF" />
            <Text style={styles.botaoSalvarTexto}>Salvar</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={modalMatriculaVisivel} animationType="slide" onRequestClose={() => setModalMatriculaVisivel(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Pressable onPress={() => setModalMatriculaVisivel(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.titulo}>Selecione a matrícula</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.modalConteudo}>
            <View style={styles.buscaContainer}>
              <Ionicons name="search" size={18} color="#6B7280" />
              <TextInput
                style={styles.buscaInput}
                placeholder="Pesquisar por aluno..."
                value={buscaMatricula}
                onChangeText={setBuscaMatricula}
              />
            </View>
            <FlatList
              data={matriculasFiltradas}
              keyExtractor={(item) => item.id_matriculas}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.itemLista}
                  onPress={() => {
                    setMatriculaSelecionada(item);
                    setModalMatriculaVisivel(false);
                    setBuscaMatricula('');
                  }}
                >
                  <Text style={styles.itemListaNome}>{nomeAluno(item.id_alunos)}</Text>
                  <Text style={styles.itemListaInfo}>Turma: {infoTurma(item.id_turmas)}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={modalDisciplinaVisivel} animationType="slide" onRequestClose={() => setModalDisciplinaVisivel(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Pressable onPress={() => setModalDisciplinaVisivel(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.titulo}>Selecione a disciplina</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.modalConteudo}>
            <View style={styles.buscaContainer}>
              <Ionicons name="search" size={18} color="#6B7280" />
              <TextInput
                style={styles.buscaInput}
                placeholder="Pesquisar por nome..."
                value={buscaDisciplina}
                onChangeText={setBuscaDisciplina}
              />
            </View>
            <FlatList
              data={disciplinasFiltradas}
              keyExtractor={(item) => item.id_disciplinas}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.itemLista}
                  onPress={() => {
                    setDisciplinaTemp(item);
                    setModalDisciplinaVisivel(false);
                    setBuscaDisciplina('');
                  }}
                >
                  <Text style={styles.itemListaNome}>{item.nome}</Text>
                  <Text style={styles.itemListaInfo}>Carga horária: {item.carga_horaria}h</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F5FB' },
  header: {
    backgroundColor: '#14213D',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titulo: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  form: { padding: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#1F1B3A', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E5EF',
  },
  seletor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seletorTexto: { fontSize: 14, color: '#1F1B3A' },
  seletorPlaceholder: { fontSize: 14, color: '#9CA3AF' },
  situacaoContainer: { flexDirection: 'row' },
  situacaoBotao: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EF',
    marginRight: 8,
  },
  situacaoBotaoAtivo: { backgroundColor: '#14213D', borderColor: '#14213D' },
  situacaoTexto: { color: '#6B7280', fontWeight: '600', fontSize: 13 },
  situacaoTextoAtivo: { color: '#FFFFFF' },
  faltaForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EF',
  },
  faltaLinha: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  botaoAdicionarFalta: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#14213D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faltaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E5EF',
  },
  faltaItemTexto: { fontSize: 13, color: '#1F1B3A', flex: 1, marginRight: 8 },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  botaoCancelar: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#14213D',
    alignItems: 'center',
  },
  botaoCancelarTexto: { color: '#14213D', fontWeight: '600' },
  botaoSalvar: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#14213D',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoSalvarTexto: { color: '#FFFFFF', fontWeight: '600', marginLeft: 6 },
  modalContainer: { flex: 1, backgroundColor: '#F4F5FB' },
  modalConteudo: { flex: 1, padding: 20 },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  buscaInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  itemLista: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  itemListaNome: { fontSize: 15, fontWeight: 'bold', color: '#1F1B3A' },
  itemListaInfo: { fontSize: 13, color: '#6B7280', marginTop: 2 },
});