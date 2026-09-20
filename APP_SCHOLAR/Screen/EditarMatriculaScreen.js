import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarMatriculaScreen({ matricula, alunos, turmas, onSalvar, onCancelar, onExcluir }) {
  const alunoAtual = alunos.find((a) => a.id === matricula.id_alunos) || null;
  const turmaAtual = turmas.find((t) => t.id_turmas === matricula.id_turmas) || null;

  const [alunoSelecionado, setAlunoSelecionado] = useState(alunoAtual);
  const [turmaSelecionada, setTurmaSelecionada] = useState(turmaAtual);
  const [dataMatricula, setDataMatricula] = useState(matricula.data_matricula || '');
  const [situacao, setSituacao] = useState(matricula.situacao_da_matricula || 'Ativa');

  const [modalAlunoVisivel, setModalAlunoVisivel] = useState(false);
  const [modalTurmaVisivel, setModalTurmaVisivel] = useState(false);
  const [buscaAluno, setBuscaAluno] = useState('');
  const [buscaTurma, setBuscaTurma] = useState('');

  const alunosFiltrados = alunos.filter((a) =>
    a.nome.toLowerCase().includes(buscaAluno.toLowerCase())
  );
  const turmasFiltradas = turmas.filter((t) =>
    `${t.turno} ${t.sala}`.toLowerCase().includes(buscaTurma.toLowerCase())
  );

  function salvar() {
    const matriculaAtualizada = {
      ...matricula,
      id_alunos: alunoSelecionado ? alunoSelecionado.id : matricula.id_alunos,
      id_turmas: turmaSelecionada ? turmaSelecionada.id_turmas : matricula.id_turmas,
      data_matricula: dataMatricula,
      situacao_da_matricula: situacao,
    };
    onSalvar(matriculaAtualizada);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir matrícula', 'Deseja excluir esta matrícula?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(matricula.id_matriculas) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Editar Matrícula</Text>
        <Pressable onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Aluno *</Text>
        <Pressable style={styles.seletor} onPress={() => setModalAlunoVisivel(true)}>
          <Text style={alunoSelecionado ? styles.seletorTexto : styles.seletorPlaceholder}>
            {alunoSelecionado ? alunoSelecionado.nome : 'Selecione o aluno'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </Pressable>

        <Text style={styles.label}>Turma *</Text>
        <Pressable style={styles.seletor} onPress={() => setModalTurmaVisivel(true)}>
          <Text style={turmaSelecionada ? styles.seletorTexto : styles.seletorPlaceholder}>
            {turmaSelecionada ? `${turmaSelecionada.turno} • ${turmaSelecionada.sala}` : 'Selecione a turma'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </Pressable>

        <Text style={styles.label}>Data da matrícula *</Text>
        <TextInput style={styles.input} value={dataMatricula} onChangeText={setDataMatricula} />

        <Text style={styles.label}>Situação *</Text>
        <View style={styles.situacaoContainer}>
          {['Ativa', 'Trancada', 'Cancelada'].map((opcao) => (
            <Pressable
              key={opcao}
              style={[styles.situacaoBotao, situacao === opcao && styles.situacaoBotaoAtivo]}
              onPress={() => setSituacao(opcao)}
            >
              <Text style={[styles.situacaoTexto, situacao === opcao && styles.situacaoTextoAtivo]}>
                {opcao}
              </Text>
            </Pressable>
          ))}
        </View>

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

      <Modal visible={modalAlunoVisivel} animationType="slide" onRequestClose={() => setModalAlunoVisivel(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Pressable onPress={() => setModalAlunoVisivel(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.titulo}>Selecione o aluno</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.modalConteudo}>
            <View style={styles.buscaContainer}>
              <Ionicons name="search" size={18} color="#6B7280" />
              <TextInput
                style={styles.buscaInput}
                placeholder="Pesquisar por nome..."
                value={buscaAluno}
                onChangeText={setBuscaAluno}
              />
            </View>
            <FlatList
              data={alunosFiltrados}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.itemLista}
                  onPress={() => {
                    setAlunoSelecionado(item);
                    setModalAlunoVisivel(false);
                    setBuscaAluno('');
                  }}
                >
                  <Text style={styles.itemListaNome}>{item.nome}</Text>
                  <Text style={styles.itemListaInfo}>RA: {item.ra_aluno}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={modalTurmaVisivel} animationType="slide" onRequestClose={() => setModalTurmaVisivel(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Pressable onPress={() => setModalTurmaVisivel(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.titulo}>Selecione a turma</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.modalConteudo}>
            <View style={styles.buscaContainer}>
              <Ionicons name="search" size={18} color="#6B7280" />
              <TextInput
                style={styles.buscaInput}
                placeholder="Pesquisar por turno ou sala..."
                value={buscaTurma}
                onChangeText={setBuscaTurma}
              />
            </View>
            <FlatList
              data={turmasFiltradas}
              keyExtractor={(item) => item.id_turmas}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.itemLista}
                  onPress={() => {
                    setTurmaSelecionada(item);
                    setModalTurmaVisivel(false);
                    setBuscaTurma('');
                  }}
                >
                  <Text style={styles.itemListaNome}>{item.sala}</Text>
                  <Text style={styles.itemListaInfo}>
                    Turno: {item.turno} • Ano letivo: {item.ano_letivo}
                  </Text>
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