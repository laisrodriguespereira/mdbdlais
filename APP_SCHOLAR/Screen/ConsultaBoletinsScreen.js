import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConsultaBoletinsScreen({
  boletins,
  matriculas,
  alunos,
  turmas,
  onVoltar,
  onNovoBoletim,
  onEditarBoletim,
  onExcluirBoletim,
}) {
  const [busca, setBusca] = useState('');

  function matriculaDoBoletim(id_matriculas) {
    return matriculas.find((m) => m.id_matriculas === id_matriculas) || null;
  }

  function nomeAluno(id_alunos) {
    const aluno = alunos.find((a) => a.id === id_alunos);
    return aluno ? aluno.nome : 'Aluno não encontrado';
  }

  function infoTurma(id_turmas) {
    const turma = turmas.find((t) => t.id_turmas === id_turmas);
    return turma ? `${turma.turno} • ${turma.sala}` : 'Turma não encontrada';
  }

  function nomeAlunoDoBoletim(item) {
    const matricula = matriculaDoBoletim(item.id_matriculas);
    return matricula ? nomeAluno(matricula.id_alunos) : 'Matrícula não encontrada';
  }

  const boletinsFiltrados = boletins.filter((item) =>
    nomeAlunoDoBoletim(item).toLowerCase().includes(busca.toLowerCase())
  );

  function estiloBadge(situacao) {
    if (situacao === 'Aprovado') return styles.badgeAprovado;
    if (situacao === 'Reprovado') return styles.badgeReprovado;
    return styles.badgeRecuperacao;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onVoltar}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.titulo}>Boletins</Text>
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

        <Pressable style={styles.botaoNovo} onPress={onNovoBoletim}>
          <Ionicons name="add" size={18} color="#FFFFFF" />
          <Text style={styles.botaoNovoTexto}>Novo Boletim</Text>
        </Pressable>

        <FlatList
          data={boletinsFiltrados}
          keyExtractor={(item) => item.id_boletins}
          renderItem={({ item }) => {
            const matricula = matriculaDoBoletim(item.id_matriculas);
            return (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardNome}>{nomeAlunoDoBoletim(item)}</Text>
                  {matricula && (
                    <Text style={styles.cardInfo}>Turma: {infoTurma(matricula.id_turmas)}</Text>
                  )}
                  <Text style={styles.cardInfo}>
                    Média: {item.media_final} • Frequência: {item.frequencia}%
                  </Text>
                  <Text style={[styles.badge, estiloBadge(item.situacao_final)]}>
                    {item.situacao_final}
                  </Text>
                </View>
                <Pressable onPress={() => onEditarBoletim(item)} style={{ marginRight: 12 }}>
                  <Ionicons name="pencil" size={20} color="#2563EB" />
                </Pressable>
                <Pressable onPress={() => onExcluirBoletim(item.id_boletins)}>
                  <Ionicons name="trash" size={20} color="#DC2626" />
                </Pressable>
              </View>
            );
          }}
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
  badgeAprovado: { backgroundColor: '#D1FAE5', color: '#059669' },
  badgeReprovado: { backgroundColor: '#FEE2E2', color: '#DC2626' },
  badgeRecuperacao: { backgroundColor: '#FEF3C7', color: '#D97706' },
});