import { Colors } from '@/constants/Colors';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface QuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
}

export function Question({ question, options, onAnswer, isAnswered }: QuestionProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.card }]}>
      <ThemedText style={[styles.question, { color: colors.text }]}>
        {question}
      </ThemedText>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: pressed ? colors.primary + '80' : colors.background,
                borderColor: colors.primary,
                opacity: isAnswered ? 0.7 : 1,
              },
            ]}
            onPress={() => onAnswer(option)}
          >
            <ThemedText 
              style={[
                styles.optionText, 
                { 
                  color: colors.text,
                  opacity: isAnswered ? 0.7 : 1,
                }
              ]}
            >
              {option}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
