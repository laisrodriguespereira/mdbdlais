import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarCursoScreen({ curso, onSalvar, onCancelar, onExcluir }) {
  const [nome, setNome] = useState(curso.nome);
  const [descricao, setDescricao] = useState(curso.descricao || '');
  const [duracao, setDuracao] = useState(String(curso.duracao));
  const [cargaHoraria, setCargaHoraria] = useState(String(curso.carga_horaria));
  const [idCoordenadores, setIdCoordenadores] = useState(String(curso.id_coordenadores || ''));

  function salvar() {
    const cursoAtualizado = {
      ...curso,
      nome: nome,
      descricao: descricao,
      duracao: duracao,
      carga_horaria: cargaHoraria,
      id_coordenadores: idCoordenadores,
    };
    onSalvar(cursoAtualizado);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir curso', `Deseja excluir ${curso.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(curso.id_cursos) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Editar Curso</Text>
        <Pressable onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome do curso *</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={4}
          maxLength={200}
        />
        <Text style={styles.contador}>{descricao.length}/200</Text>

        <Text style={styles.label}>Duração (em anos) *</Text>
        <TextInput style={styles.input} value={duracao} onChangeText={setDuracao} keyboardType="numeric" />

        <Text style={styles.label}>Carga horária (horas) *</Text>
        <TextInput style={styles.input} value={cargaHoraria} onChangeText={setCargaHoraria} keyboardType="numeric" />

        <Text style={styles.label}>ID Coordenador (temporário)</Text>
        <TextInput style={styles.input} value={idCoordenadores} onChangeText={setIdCoordenadores} keyboardType="numeric" />

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