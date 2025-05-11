import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.content}>
        <Image
          source={require('@/assets/images/logo.svg')}
          style={[styles.logo, { width: width * 0.6 }]}
          contentFit="contain"
        />

        <ThemedView style={styles.titleContainer}>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            Pegada Ecológica
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.descriptionContainer}>
          <ThemedText style={[styles.description, { color: colors.text }]}>
            Descubra quantos planetas seriam necessários para sustentar seu estilo de vida! Este questionário avalia seu impacto ambiental em diferentes aspectos do dia a dia, incluindo transporte, consumo de energia, alimentação e uso de água.
          </ThemedText>
        </ThemedView>

        <Pressable 
          style={[styles.startButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/questionario')}
        >
          <ThemedText style={styles.startButtonText}>Iniciar Questionário</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    marginBottom: 30,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  startButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 200,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
