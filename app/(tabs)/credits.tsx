import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';

export default function CreditsScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>  
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image
          source={require('@/assets/images/logoUnissagrado.jpg')}
          style={[styles.logo, { width: width * 0.6 }]}
          contentFit="contain"
        />
        <ThemedText style={[styles.title, { color: colors.text }]}>Créditos</ThemedText>
        <ThemedText style={[styles.section, { color: colors.text }]}>Professor responsável:</ThemedText>
        <ThemedText style={[styles.text, { color: colors.text }]}>Prof. Dr. Elvio Gilberto da Silva</ThemedText>
        <ThemedText style={[styles.section, { color: colors.text }]}>Alunos/Desenvolvedores:</ThemedText>
        <ThemedText style={[styles.text, { color: colors.text }]}>- Tatiane Ricardo da Cruz{"\n"}- Caio Gabriel Veloso dos Santos{"\n"}- Nathan de Souza Faria{"\n"}- Samuel Henrique de Camargo</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    height: 120,
    marginBottom: 24,
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 24,
  },
}); 