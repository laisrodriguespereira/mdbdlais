import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const opcoesDoMenu = [
  { nome: 'Alunos', icone: 'people-outline', cor: '#4338CA' },
  { nome: 'Professores', icone: 'school-outline', cor: '#0EA5A5' },
  { nome: 'Turmas', icone: 'albums-outline', cor: '#D97706' },
  { nome: 'Cursos', icone: 'book-outline', cor: '#DB2777' },
  { nome: 'Disciplinas', icone: 'library-outline', cor: '#059669' },
  { nome: 'Matrículas', icone: 'clipboard-outline', cor: '#2563EB' },
  { nome: 'Responsáveis', icone: 'person-outline', cor: '#7C3AED' },
  { nome: 'Avaliações', icone: 'star-outline', cor: '#EA580C' },
  { nome: 'Coordenadores', icone: 'briefcase-outline', cor: '#0891B2' },
  { nome: 'Boletins', icone: 'document-text-outline', cor: '#BE123C' },
];

export default function HomeScreen({ onAbrirAlunos, onAbrirProfessores, onAbrirTurmas, onAbrirCursos, onAbrirDisciplinas, onAbrirMatriculas, onAbrirResponsaveis, onAbrirAvaliacoes, onAbrirCoordenadores, onAbrirBoletins }) {
  function abrirOpcao(nome) {
    if (nome === 'Alunos') {
      onAbrirAlunos();
      return;
    }
    if (nome === 'Professores') {
      onAbrirProfessores();
      return;
    }
    if (nome === 'Turmas') {
      onAbrirTurmas();
      return;
    }
    if (nome === 'Cursos') {
      onAbrirCursos();
      return;
    }
    if (nome === 'Disciplinas') {
      onAbrirDisciplinas();
      return;
    }
    if (nome === 'Matrículas') {
      onAbrirMatriculas();
      return;
    }
    if (nome === 'Responsáveis') {
      onAbrirResponsaveis();
      return;
    }
    if (nome === 'Avaliações') {
      onAbrirAvaliacoes();
      return;
    }
    if (nome === 'Coordenadores') {
      onAbrirCoordenadores();
      return;
    }
    if (nome === 'Boletins') {
      onAbrirBoletins();
      return;
    }
    Alert.alert(nome, 'Essa tela ainda vai ser criada.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <View>
          <Text style={styles.titulo}>APP_SCHOLAR</Text>
          <Text style={styles.subtitulo}>Sistema Acadêmico Escolar</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grade}>
        {opcoesDoMenu.map((opcao) => (
          <Pressable
            key={opcao.nome}
            style={styles.card}
            onPress={() => abrirOpcao(opcao.nome)}
          >
            <View style={[styles.iconCirculo, { backgroundColor: opcao.cor }]}>
              <Ionicons name={opcao.icone} size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTexto}>{opcao.nome}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5FB',
  },
  header: {
    backgroundColor: '#14213D',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 19,
    resizeMode: 'contain',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#A8B5D1',
    fontSize: 13,
    marginTop: 2,
  },
  grade: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  iconCirculo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F1B3A',
  },
});