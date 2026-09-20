import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroTurmaScreen({ onSalvar, onCancelar }) {
  const [turno, setTurno] = useState('');
  const [sala, setSala] = useState('');
  const [anoLetivo, setAnoLetivo] = useState('');
  const [idCursos, setIdCursos] = useState('');

  function salvar() {
    if (!turno || !sala || !anoLetivo) {
      alert('Preencha todos os campos obrigatórios (*)');
      return;
    }

    const novaTurma = {
      id_turmas: Date.now().toString(),
      turno: turno,
      sala: sala,
      ano_letivo: anoLetivo,
      id_cursos: idCursos,
    };

    onSalvar(novaTurma);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Cadastro de Turma</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Turno *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Manhã, Tarde ou Noite"
          value={turno}
          onChangeText={setTurno}
        />

        <Text style={styles.label}>Sala *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Sala 12"
          value={sala}
          onChangeText={setSala}
        />

        <Text style={styles.label}>Ano letivo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2024"
          value={anoLetivo}
          onChangeText={setAnoLetivo}
          keyboardType="numeric"
        />

        <Text style={styles.label}>ID Curso (temporário)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o id_cursos"
          value={idCursos}
          onChangeText={setIdCursos}
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