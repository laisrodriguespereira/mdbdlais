import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarDisciplinaScreen({ disciplina, onSalvar, onCancelar, onExcluir }) {
  const [nome, setNome] = useState(disciplina.nome);
  const [cargaHoraria, setCargaHoraria] = useState(String(disciplina.carga_horaria || ''));
  const [idCursos, setIdCursos] = useState(String(disciplina.id_cursos || ''));
  const [idProfessores, setIdProfessores] = useState(String(disciplina.id_professores || ''));

  function salvar() {
    const disciplinaAtualizada = {
      ...disciplina,
      nome: nome,
      carga_horaria: cargaHoraria,
      id_cursos: idCursos,
      id_professores: idProfessores,
    };
    onSalvar(disciplinaAtualizada);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir disciplina', `Deseja excluir ${disciplina.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(disciplina.id_disciplinas) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Editar Disciplina</Text>
        <Pressable onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome da disciplina *</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Carga horária (horas) *</Text>
        <TextInput style={styles.input} value={cargaHoraria} onChangeText={setCargaHoraria} keyboardType="numeric" />

        <Text style={styles.label}>ID Curso (temporário)</Text>
        <TextInput style={styles.input} value={idCursos} onChangeText={setIdCursos} keyboardType="numeric" />

        <Text style={styles.label}>ID Professor (temporário)</Text>
        <TextInput style={styles.input} value={idProfessores} onChangeText={setIdProfessores} keyboardType="numeric" />

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