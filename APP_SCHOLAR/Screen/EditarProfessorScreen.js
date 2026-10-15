import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditarProfessorScreen({ professor, formacoes = [], onSalvar, onCancelar, onExcluir }) {
  const [nome, setNome] = useState(professor.nome);
  const [cpf, setCpf] = useState(professor.cpf);
  const [idFormacoes, setIdFormacoes] = useState(String(professor.id_formacoes || ''));
  const [outraFormacao, setOutraFormacao] = useState(false);
  const [novaFormacao, setNovaFormacao] = useState('');
  const [telefone, setTelefone] = useState(professor.telefone || '');
  const [email, setEmail] = useState(professor.email || '');

  function salvar() {
    if (!nome || !cpf || !telefone || !email) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios (*)');
      return;
    }
    if (outraFormacao && !novaFormacao.trim()) {
      Alert.alert('Atenção', 'Digite o nome da nova formação');
      return;
    }

    const professorAtualizado = {
      ...professor,
      nome: nome,
      cpf: cpf,
      id_formacoes: outraFormacao ? '' : idFormacoes,
      nova_formacao: outraFormacao ? novaFormacao.trim() : '',
      telefone: telefone,
      email: email,
    };
    onSalvar(professorAtualizado);
  }

  function confirmarExclusao() {
    Alert.alert('Excluir professor', `Deseja excluir ${professor.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(professor.id_professores) },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onCancelar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Editar Professor</Text>
        <Pressable onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome completo *</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>CPF *</Text>
        <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" />

        <Text style={styles.label}>Formação</Text>
        <View style={styles.opcoes}>
          {formacoes.map((f) => {
            const selecionada = !outraFormacao && String(f.id_formacoes) === String(idFormacoes);
            return (
              <Pressable
                key={f.id_formacoes}
                style={[styles.opcao, selecionada && styles.opcaoSelecionada]}
                onPress={() => {
                  setIdFormacoes(String(f.id_formacoes));
                  setOutraFormacao(false);
                }}
              >
                <Text style={[styles.opcaoTexto, selecionada && styles.opcaoTextoSelecionado]}>
                  {f.formacao}
                </Text>
              </Pressable>
            );
          })}
          <Pressable
            style={[styles.opcao, outraFormacao && styles.opcaoSelecionada]}
            onPress={() => setOutraFormacao(true)}
          >
            <Text style={[styles.opcaoTexto, outraFormacao && styles.opcaoTextoSelecionado]}>
              + Outra formação
            </Text>
          </Pressable>
        </View>
        {outraFormacao && (
          <TextInput
            style={styles.input}
            placeholder="Digite a nova formação"
            value={novaFormacao}
            onChangeText={setNovaFormacao}
            maxLength={80}
          />
        )}

        <Text style={styles.label}>Telefone *</Text>
        <TextInput
          style={styles.input}
          placeholder="(00) 00000-0000"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          maxLength={20}
        />

        <Text style={styles.label}>E-mail *</Text>
        <TextInput
          style={styles.input}
          placeholder="professor@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          maxLength={120}
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
  opcoes: { flexDirection: 'row', flexWrap: 'wrap' },
  opcao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  opcaoSelecionada: { backgroundColor: '#14213D', borderColor: '#14213D' },
  opcaoTexto: { fontSize: 13, color: '#1F1B3A' },
  opcaoTextoSelecionado: { color: '#FFFFFF', fontWeight: '600' },
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
