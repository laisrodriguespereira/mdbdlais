import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConsultaMatriculasScreen({
  matriculas,
  alunos,
  turmas,
  onVoltar,
  onNovaMatricula,
  onEditarMatricula,
  onExcluirMatricula,
}) {
  const [busca, setBusca] = useState('');

  function nomeAluno(id_alunos) {
    const aluno = alunos.find((a) => a.id === id_alunos);
    return aluno ? aluno.nome : 'Aluno não encontrado';
  }

  function infoTurma(id_turmas) {
    const turma = turmas.find((t) => t.id_turmas === id_turmas);
    return turma ? `${turma.turno} • ${turma.sala}` : 'Turma não encontrada';
  }

  const matriculasFiltradas = matriculas.filter((m) =>
    nomeAluno(m.id_alunos).toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onVoltar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Matrículas</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.conteudo}>
        <View style={styles.buscaContainer}>
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            style={styles.buscaInput}
            placeholder="Pesquisar por aluno..."
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <Pressable style={styles.botaoNovo} onPress={onNovaMatricula}>
          <Ionicons name="add" size={18} color="#FFFFFF" />
          <Text style={styles.botaoNovoTexto}>Nova Matrícula</Text>
        </Pressable>

        <FlatList
          data={matriculasFiltradas}
          keyExtractor={(item) => item.id_matriculas}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardNome}>{nomeAluno(item.id_alunos)}</Text>
                <Text style={styles.cardInfo}>Turma: {infoTurma(item.id_turmas)}</Text>
                <Text style={styles.cardInfo}>Data: {item.data_matricula}</Text>
                <Text
                  style={[
                    styles.badge,
                    item.situacao_da_matricula === 'Ativa' ? styles.badgeAtiva : styles.badgeInativa,
                  ]}
                >
                  {item.situacao_da_matricula}
                </Text>
              </View>
              <Pressable onPress={() => onEditarMatricula(item)} style={{ marginRight: 12 }}>
                <Ionicons name="pencil" size={20} color="#2563EB" />
              </Pressable>
              <Pressable onPress={() => onExcluirMatricula(item.id_matriculas)}>
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
  badgeAtiva: { backgroundColor: '#D1FAE5', color: '#059669' },
  badgeInativa: { backgroundColor: '#FEE2E2', color: '#DC2626' },
});