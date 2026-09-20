import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Sobre</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.appNome}>APP_SCHOLAR</Text>
        <Text style={styles.versao}>Versão 1.0.0</Text>
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Sobre o App</Text>
          <Text style={styles.secaoTexto}>
            Sistema acadêmico para gerenciar alunos, professores, turmas e mais.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F5FB' },
  header: { backgroundColor: '#14213D', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 },
  titulo: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  appNome: { fontSize: 22, fontWeight: 'bold', color: '#1F1B3A', textAlign: 'center', marginTop: 10 },
  versao: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  secao: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 14 },
  secaoTitulo: { fontSize: 15, fontWeight: 'bold', color: '#14213D', marginBottom: 6 },
  secaoTexto: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
});