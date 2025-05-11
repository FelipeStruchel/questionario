import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';

interface Resultado {
  nome: string;
  score: number;
  planets: number;
  date: string;
}

export default function HistoricoScreen() {
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const historico = await AsyncStorage.getItem('historico');
      if (historico) {
        setResultados(JSON.parse(historico));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const limparHistorico = async () => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza que deseja limpar todo o histórico?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('historico');
              setResultados([]);
            } catch (error) {
              console.error('Erro ao limpar histórico:', error);
            }
          },
        },
      ]
    );
  };

  const formatarData = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText style={[styles.title, { color: colors.text }]}>
        Histórico de Resultados
      </ThemedText>

      <ScrollView style={styles.scrollView}>
        {resultados.length === 0 ? (
          <ThemedText style={[styles.emptyText, { color: colors.text }]}>
            Nenhum resultado salvo ainda.
          </ThemedText>
        ) : (
          resultados.map((resultado, index) => (
            <ThemedView
              key={index}
              style={[styles.resultCard, { backgroundColor: colors.card }]}
            >
              <ThemedText style={[styles.nome, { color: colors.text }]}>
                {resultado.nome}
              </ThemedText>
              <ThemedText style={[styles.score, { color: colors.text }]}>
                Pontuação: {resultado.score}%
              </ThemedText>
              <ThemedText style={[styles.planets, { color: colors.text }]}>
                Planetas necessários: {resultado.planets}
              </ThemedText>
              <ThemedText style={[styles.date, { color: colors.text }]}>
                {formatarData(resultado.date)}
              </ThemedText>
            </ThemedView>
          ))
        )}
      </ScrollView>

      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => router.back()}
      >
        <ThemedText style={styles.buttonText}>Voltar</ThemedText>
      </Pressable>

      {resultados.length > 0 && (
        <Pressable
          style={[styles.clearButton, { backgroundColor: colors.error }]}
          onPress={limparHistorico}
        >
          <ThemedText style={styles.buttonText}>Limpar Histórico</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  resultCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  score: {
    fontSize: 16,
    marginBottom: 4,
  },
  planets: {
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  clearButton: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 