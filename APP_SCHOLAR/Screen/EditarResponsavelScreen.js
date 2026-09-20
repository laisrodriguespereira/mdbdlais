import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarResponsavelScreen({ responsavel, onSalvar, onCancelar, onExcluir }) {
  const [nome, setNome] = useState(responsavel.nome);
  const [cpf, setCpf] = useState(responsavel.cpf);
  const [parentesco, setParentesco] = useState(responsavel.parentesco);
  const [idContato, setIdContato] = useState(String(responsavel.id_contato || ''));

  function salvar() {
    const responsavelAtualizado = {
      ...responsavel,
      nome: nome,
      cpf: cpf,
      parentesco: parentesco,
      id_contato: idContato,
    };
    onSalvar(responsavelAtualizado);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir responsável', `Deseja excluir ${responsavel.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(responsavel.id_responsaveis) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Editar Responsável</Text>
        <Pressable onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome completo *</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>CPF *</Text>
        <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" />

        <Text style={styles.label}>Parentesco *</Text>
        <TextInput style={styles.input} value={parentesco} onChangeText={setParentesco} />

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