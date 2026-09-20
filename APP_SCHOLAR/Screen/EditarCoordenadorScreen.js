import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarCoordenadorScreen({ coordenador, onSalvar, onCancelar, onExcluir }) {
  const [nome, setNome] = useState(coordenador.nome);
  const [cpf, setCpf] = useState(coordenador.cpf);
  const [idFormacoes, setIdFormacoes] = useState(String(coordenador.id_formacoes || ''));
  const [idContato, setIdContato] = useState(String(coordenador.id_contato || ''));

  function salvar() {
    const coordenadorAtualizado = {
      ...coordenador,
      nome: nome,
      cpf: cpf,
      id_formacoes: idFormacoes,
      id_contato: idContato,
    };
    onSalvar(coordenadorAtualizado);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir coordenador', `Deseja excluir ${coordenador.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(coordenador.id_coordenadores) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Editar Coordenador</Text>
        <Pressable onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome completo *</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>CPF *</Text>
        <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" />

        <Text style={styles.label}>ID Formação (temporário)</Text>
        <TextInput style={styles.input} value={idFormacoes} onChangeText={setIdFormacoes} keyboardType="numeric" />

        <Text style={styles.label}>ID Contato (temporário)</Text>
        <TextInput style={styles.input} value={idContato} onChangeText={setIdContato} keyboardType="numeric" />

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