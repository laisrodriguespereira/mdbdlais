import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroProfessorScreen({ onSalvar, onCancelar }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idFormacoes, setIdFormacoes] = useState('');
  const [idContato, setIdContato] = useState('');

  function salvar() {
    if (!nome || !cpf) {
      alert('Preencha todos os campos obrigatórios (*)');
      return;
    }

    const novoProfessor = {
      id_professores: Date.now().toString(),
      nome: nome,
      cpf: cpf,
      id_formacoes: idFormacoes,
      id_contato: idContato,
    };

    onSalvar(novoProfessor);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Cadastro de Professor</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome completo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>CPF *</Text>
        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />

        <Text style={styles.label}>ID Formação (temporário)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o id_formacoes"
          value={idFormacoes}
          onChangeText={setIdFormacoes}
          keyboardType="numeric"
        />

        <Text style={styles.label}>ID Contato (temporário)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o id_contato"
          value={idContato}
          onChangeText={setIdContato}
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