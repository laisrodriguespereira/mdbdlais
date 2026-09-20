import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroCursoScreen({ onSalvar, onCancelar }) {
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [duracao, setDuracao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idCoordenadores, setIdCoordenadores] = useState('');

  function salvar() {
    if (!nome || !cargaHoraria || !duracao || !descricao) {
      alert('Preencha todos os campos obrigatórios (*)');
      return;
    }

    const novoCurso = {
      id_cursos: Date.now().toString(),
      nome: nome,
      carga_horaria: cargaHoraria,
      duracao: duracao,
      descricao: descricao,
      id_coordenadores: idCoordenadores,
    };

    onSalvar(novoCurso);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Cadastro de Curso</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome do curso *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do curso"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite uma descrição para o curso..."
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
          maxLength={200}
        />
        <Text style={styles.contador}>{descricao.length}/200</Text>

        <Text style={styles.label}>Duração (em anos) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 3"
          value={duracao}
          onChangeText={setDuracao}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Carga horária (horas) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1200"
          value={cargaHoraria}
          onChangeText={setCargaHoraria}
          keyboardType="numeric"
        />

        <Text style={styles.label}>ID Coordenador (temporário)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o id_coordenadores"
          value={idCoordenadores}
          onChangeText={setIdCoordenadores}
          keyboardType="numeric"
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
  textArea: { minHeight: 90, textAlignVertical: 'top' },
  contador: { fontSize: 11, color: '#9CA3AF', textAlign: 'right', marginTop: 4 },
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
});