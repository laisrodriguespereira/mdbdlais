import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Campos mapeados para o banco `escolar`:
// - id_alunos       -> avaliacoes.id_alunos / notas.id_alunos
// - id_disciplinas  -> avaliacoes.id_disciplinas
// - descricao       -> avaliacoes.descricao
// - data            -> avaliacoes.data
// - nota            -> notas.nota (tabela separada, ligada por id_avaliacoes)
export default function EditarAvaliacaoScreen({ avaliacao, alunos, disciplinas, onSalvar, onCancelar, onExcluir }) {
  const alunoAtual = alunos.find((a) => a.id === avaliacao.id_alunos) || null;
  const disciplinaAtual = disciplinas.find((d) => d.id_disciplinas === avaliacao.id_disciplinas) || null;

  const [alunoSelecionado, setAlunoSelecionado] = useState(alunoAtual);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(disciplinaAtual);
  const [descricao, setDescricao] = useState(avaliacao.descricao || '');
  const [data, setData] = useState(avaliacao.data || '');
  const [nota, setNota] = useState(avaliacao.nota != null ? String(avaliacao.nota) : '');

  const [modalAlunoVisivel, setModalAlunoVisivel] = useState(false);
  const [modalDisciplinaVisivel, setModalDisciplinaVisivel] = useState(false);
  const [buscaAluno, setBuscaAluno] = useState('');
  const [buscaDisciplina, setBuscaDisciplina] = useState('');

  const alunosFiltrados = alunos.filter((a) =>
    a.nome.toLowerCase().includes(buscaAluno.toLowerCase())
  );
  const disciplinasFiltradas = disciplinas.filter((d) =>
    d.nome.toLowerCase().includes(buscaDisciplina.toLowerCase())
  );

  function salvar() {
    const avaliacaoAtualizada = {
      ...avaliacao,
      id_alunos: alunoSelecionado ? alunoSelecionado.id : avaliacao.id_alunos,
      id_disciplinas: disciplinaSelecionada ? disciplinaSelecionada.id_disciplinas : avaliacao.id_disciplinas,
      descricao,
      data,
      nota,
    };
    onSalvar(avaliacaoAtualizada);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir avaliação', 'Deseja excluir esta avaliação?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(avaliacao.id_avaliacoes) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Editar Avaliação</Text>
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

        <Text style={styles.label}>Disciplina *</Text>
        <Pressable style={styles.seletor} onPress={() => setModalDisciplinaVisivel(true)}>
          <Text style={disciplinaSelecionada ? styles.seletorTexto : styles.seletorPlaceholder}>
            {disciplinaSelecionada ? disciplinaSelecionada.nome : 'Selecione a disciplina'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </Pressable>

        <Text style={styles.label}>Descrição *</Text>
        <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

        <Text style={styles.label}>Data da avaliação *</Text>
        <TextInput style={styles.input} value={data} onChangeText={setData} />

        <Text style={styles.label}>Nota *</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={nota}
          onChangeText={setNota}
        />

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
                    setDisciplinaSelecionada(item);
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