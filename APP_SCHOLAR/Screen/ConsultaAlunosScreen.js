import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConsultaAlunosScreen({
  alunos,
  onVoltar,
  onNovoAluno,
  onEditarAluno,
  onExcluirAluno,
}) {
  const [busca, setBusca] = useState('');

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onVoltar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Alunos</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.conteudo}>
        <View style={styles.buscaContainer}>
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            style={styles.buscaInput}
            placeholder="Pesquisar por nome..."
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <Pressable style={styles.botaoNovo} onPress={onNovoAluno}>
          <Ionicons name="add" size={18} color="#FFFFFF" />
          <Text style={styles.botaoNovoTexto}>Novo Aluno</Text>
        </Pressable>

        <FlatList
          data={alunosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardNome}>{item.nome}</Text>
                <Text style={styles.cardInfo}>RA: {item.ra_aluno}</Text>
                <Text
                  style={[
                    styles.badge,
                    item.status === 'A' ? styles.badgeAtivo : styles.badgeInativo,
                  ]}
                >
                  {item.status === 'A' ? 'Ativo' : 'Inativo'}
                </Text>
              </View>
              <Pressable onPress={() => onEditarAluno(item)} style={{ marginRight: 12 }}>
                <Ionicons name="pencil" size={20} color="#2563EB" />
              </Pressable>
              <Pressable onPress={() => onExcluirAluno(item.id)}>
                <Ionicons name="trash" size={20} color="#DC2626" />
              </Pressable>
            </View>
          )}
        />
      </View>
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
  titulo: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  conteudo: { flex: 1, padding: 20 },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  buscaInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  botaoNovo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14213D',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 16,
  },
  botaoNovoTexto: { color: '#FFFFFF', fontWeight: '600', marginLeft: 6 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  cardNome: { fontSize: 15, fontWeight: 'bold', color: '#1F1B3A' },
  cardInfo: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  badge: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  badgeAtivo: { backgroundColor: '#D1FAE5', color: '#059669' },
  badgeInativo: { backgroundColor: '#FEE2E2', color: '#DC2626' },
});