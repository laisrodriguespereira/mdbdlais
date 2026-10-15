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
  const [telefone, setTelefone] = useState(aluno.telefone || '');
  const [email, setEmail] = useState(aluno.email || '');
  const [cep, setCep] = useState(aluno.cep || '');
  const [rua, setRua] = useState(aluno.rua || '');
  const [bairro, setBairro] = useState(aluno.bairro || '');
  const [cidade, setCidade] = useState(aluno.cidade || '');
  const [uf, setUf] = useState(aluno.uf || '');
  const [status, setStatus] = useState(aluno.status);

  function salvar() {
    if (!nome || !dataNascimento || !cpf || !ra || !numeroCasa || !telefone || !email || !cep || !rua || !bairro || !cidade || !uf) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios (*)');
      return;
    }

    const alunoAtualizado = {
      ...aluno,
      nome: nome,
      data_de_nascimento: dataNascimento,
      cpf: cpf,
      ra_aluno: ra,
      numero_da_casa: numeroCasa,
      complemento: complemento,
      telefone: telefone,
      email: email,
      cep: cep,
      rua: rua,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
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

        <Text style={styles.secao}>Contato</Text>

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
          placeholder="aluno@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          maxLength={120}
        />

        <Text style={styles.secao}>Endereço</Text>

        <Text style={styles.label}>CEP *</Text>
        <TextInput
          style={styles.input}
          placeholder="00000-000"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          maxLength={9}
        />

        <Text style={styles.label}>Rua *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da rua"
          value={rua}
          onChangeText={setRua}
          maxLength={100}
        />

        <Text style={styles.label}>Número da casa *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 123"
          value={numeroCasa}
          onChangeText={setNumeroCasa}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Complemento</Text>
        <TextInput
          style={styles.input}
          placeholder="Apto, bloco, etc."
          value={complemento}
          onChangeText={setComplemento}
        />

        <Text style={styles.label}>Bairro *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do bairro"
          value={bairro}
          onChangeText={setBairro}
          maxLength={100}
        />

        <Text style={styles.label}>Cidade *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da cidade"
          value={cidade}
          onChangeText={setCidade}
          maxLength={100}
        />

        <Text style={styles.label}>UF *</Text>
        <TextInput
          style={styles.input}
          placeholder="SP"
          value={uf}
          onChangeText={setUf}
          autoCapitalize="characters"
          maxLength={2}
        />

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
  secao: { fontSize: 16, fontWeight: 'bold', color: '#14213D', marginTop: 24 },
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