import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarAlunoScreen({ aluno, onSalvar, onCancelar, onExcluir }) {
  const [nome, setNome] = useState(aluno.nome);
  const [dataNascimento, setDataNascimento] = useState(aluno.data_de_nascimento);
  const [cpf, setCpf] = useState(aluno.cpf);
  const [ra, setRa] = useState(aluno.ra_aluno);
  const [numeroCasa, setNumeroCasa] = useState(String(aluno.numero_da_casa));
  const [complemento, setComplemento] = useState(aluno.complemento || '');
  const [status, setStatus] = useState(aluno.status);

  function salvar() {
    const alunoAtualizado = {
      ...aluno,
      nome: nome,
      data_de_nascimento: dataNascimento,
      cpf: cpf,
      ra_aluno: ra,
      numero_da_casa: numeroCasa,
      complemento: complemento,
      status: status,
    };
    onSalvar(alunoAtualizado);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir aluno', `Deseja excluir ${aluno.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(aluno.id) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Editar Aluno</Text>
        <Pressable onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome completo *</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Data de nascimento *</Text>
        <TextInput style={styles.input} value={dataNascimento} onChangeText={setDataNascimento} />

        <Text style={styles.label}>CPF *</Text>
        <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" />

        <Text style={styles.label}>RA *</Text>
        <TextInput style={styles.input} value={ra} onChangeText={setRa} />

        <Text style={styles.label}>Número da casa *</Text>
        <TextInput style={styles.input} value={numeroCasa} onChangeText={setNumeroCasa} keyboardType="numeric" />

        <Text style={styles.label}>Complemento</Text>
        <TextInput style={styles.input} value={complemento} onChangeText={setComplemento} />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          <Pressable
            style={[styles.statusBotao, status === 'A' && styles.statusBotaoAtivo]}
            onPress={() => setStatus('A')}
          >
            <Text style={[styles.statusTexto, status === 'A' && styles.statusTextoAtivo]}>
              Ativo
            </Text>
          </Pressable>
          <Pressable
            style={[styles.statusBotao, status === 'I' && styles.statusBotaoInativo]}
            onPress={() => setStatus('I')}
          >
            <Text style={[styles.statusTexto, status === 'I' && styles.statusTextoAtivo]}>
              Inativo
            </Text>
          </Pressable>
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
  statusContainer: { flexDirection: 'row' },
  statusBotao: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5EF',
    marginRight: 8,
  },
  statusBotaoAtivo: { backgroundColor: '#059669', borderColor: '#059669' },
  statusBotaoInativo: { backgroundColor: '#DC2626', borderColor: '#DC2626' },
  statusTexto: { color: '#6B7280', fontWeight: '600' },
  statusTextoAtivo: { color: '#FFFFFF' },
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