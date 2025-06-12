import { Question } from '@/components/Question';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, useColorScheme, useWindowDimensions } from 'react-native';

interface QuestionData {
  category: string;
  question: string;
  options: string[];
  points: number[];
}

const questions: QuestionData[] = [
  // Transporte
  {
    category: "Transporte",
    question: "Com que frequência você utiliza carro ou moto?",
    options: ["Sempre", "Às vezes", "Raramente", "Nunca"],
    points: [3, 2, 1, 0]
  },
  {
    category: "Transporte",
    question: "Você utiliza transporte público?",
    options: ["Nunca", "Às vezes", "Sempre"],
    points: [2, 1, 0]
  },
  {
    category: "Transporte",
    question: "Você usa bicicleta ou caminha para seus deslocamentos?",
    options: ["Nunca", "Às vezes", "Sempre"],
    points: [2, 1, 0]
  },
  // Consumo de Energia
  {
    category: "Consumo de Energia",
    question: "Como é o consumo de energia elétrica em sua casa?",
    options: ["Alto", "Moderado", "Econômico"],
    points: [3, 2, 1]
  },
  {
    category: "Consumo de Energia",
    question: "Sua residência possui fontes alternativas de energia? (solar, eólica)",
    options: ["Não", "Sim"],
    points: [2, 0]
  },
  {
    category: "Consumo de Energia",
    question: "Sua residência possui lâmpadas LED?",
    options: ["Não", "Sim"],
    points: [2, 0]
  },
  {
    category: "Consumo de Energia",
    question: "Você desliga aparelhos eletrônicos da tomada quando não está usando?",
    options: ["Não", "Sim"],
    points: [2, 0]
  },
  // Alimentação
  {
    category: "Alimentação",
    question: "Qual a frequência de consumo de carne vermelha?",
    options: ["Sempre", "Às vezes", "Nunca"],
    points: [2, 1, 0]
  },
  {
    category: "Alimentação",
    question: "Você consome produtos industrializados?",
    options: ["Diariamente", "Algumas vezes por semana", "Raramente", "Nunca"],
    points: [3, 2, 1, 0]
  },
  {
    category: "Alimentação",
    question: "Você compra alimentos de produtores locais (feiras, produtores da sua cidade)?",
    options: ["Nunca", "Às vezes", "Sempre"],
    points: [2, 1, 0]
  },
  // Consumo de Água
  {
    category: "Consumo de Água",
    question: "Você pratica economia de água em casa?",
    options: ["Nunca", "Às vezes", "Sempre"],
    points: [3, 1, 0]
  },
  {
    category: "Consumo de Água",
    question: "Sua residência capta água da chuva ou utiliza sistema de reaproveitamento?",
    options: ["Não", "Sim"],
    points: [2, 0]
  }
];

const categories = ["Transporte", "Consumo de Energia", "Alimentação", "Consumo de Água"];

export default function QuestionarioScreen() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [nome, setNome] = useState('');
  const [salvando, setSalvando] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();

  const handleAnswer = (questionIndex: number, answer: string) => {
    const optionIndex = questions[questionIndex].options.indexOf(answer);
    const newAnswers = [...answers];
    newAnswers[questionIndex] = questions[questionIndex].points[optionIndex];
    setAnswers(newAnswers);

    // Verifica se todas as questões da categoria atual foram respondidas
    const categoryQuestions = questions.filter(q => q.category === categories[currentCategory]);
    const categoryAnswers = categoryQuestions.map((_, index) => {
      const questionIndex = questions.findIndex(q => q.category === categories[currentCategory]) + index;
      return newAnswers[questionIndex];
    });

    if (!categoryAnswers.includes(-1) && currentCategory < categories.length - 1) {
      // Avança para a próxima categoria após um pequeno delay
      setTimeout(() => {
        setCurrentCategory(prev => prev + 1);
      }, 500);
    }
  };

  const checkCategoryComplete = (categoryIndex: number) => {
    const categoryQuestions = questions.filter(q => q.category === categories[categoryIndex]);
    return categoryQuestions.every((_, index) => {
      const questionIndex = questions.findIndex(q => q.category === categories[categoryIndex]) + index;
      return answers[questionIndex] !== -1;
    });
  };

  const isAllCategoriesComplete = () => {
    return categories.every((_, index) => checkCategoryComplete(index));
  };

  const calculateScore = () => {
    const totalPoints = answers.reduce((sum, points) => sum + points, 0);
    const maxPoints = questions.reduce((sum, q) => sum + Math.max(...q.points), 0);
    return Math.round((totalPoints / maxPoints) * 100);
  };

  const calculatePlanets = (score: number) => {
    if (score >= 80) return 1;
    if (score >= 60) return 2;
    if (score >= 40) return 3;
    return 4;
  };

  const getFootprintLevel = (score: number) => {
    if (score >= 80) return "Baixa";
    if (score >= 60) return "Moderada";
    if (score >= 40) return "Alta";
    return "Muito Alta";
  };

  const getHealthTips = (score: number, planets: number) => {
    const tips = [];
    
    if (planets > 1) {
      tips.push(`Seu impacto ecológico indica que precisaríamos de ${planets} planetas para sustentar seu estilo de vida.`);
    }

    if (score < 80) {
      tips.push("Sugestões para reduzir seu impacto ecológico:");
      
      // Dicas específicas baseadas nas categorias com menor pontuação
      const categoryScores = questions.reduce((acc, q, index) => {
        if (!acc[q.category]) acc[q.category] = { total: 0, count: 0 };
        acc[q.category].total += answers[index];
        acc[q.category].count++;
        return acc;
      }, {} as Record<string, { total: number; count: number }>);

      const lowestCategory = Object.entries(categoryScores)
        .sort((a, b) => (a[1].total / a[1].count) - (b[1].total / b[1].count))[0][0];

      switch (lowestCategory) {
        case "Transporte":
          tips.push("- Use mais transporte público, bicicleta ou caminhada\n- Compartilhe caronas quando possível");
          break;
        case "Consumo de Energia":
          tips.push("- Substitua lâmpadas por LED\n- Desligue aparelhos da tomada\n- Considere energia solar");
          break;
        case "Alimentação":
          tips.push("- Reduza o consumo de carne\n- Compre mais produtos locais\n- Evite alimentos industrializados");
          break;
        case "Consumo de Água":
          tips.push("- Instale sistemas de captação de água da chuva\n- Reduza o tempo no banho\n- Reutilize água quando possível");
          break;
      }
    }

    return tips.join("\n\n");
  };

  const saveResults = async (score: number, planets: number) => {
    try {
      const resultado = {
        nome,
        score,
        planets,
        date: new Date().toISOString()
      };

      // Salva o último resultado
      await AsyncStorage.setItem('lastResults', JSON.stringify(resultado));

      // Adiciona ao histórico
      const historico = await AsyncStorage.getItem('historico');
      const historicoArray = historico ? JSON.parse(historico) : [];
      historicoArray.push(resultado);
      await AsyncStorage.setItem('historico', JSON.stringify(historicoArray));

      setSalvando(true);
      setTimeout(() => {
        setSalvando(false);
        router.replace('/');
      }, 1500);
    } catch (error) {
      console.error('Erro ao salvar resultados:', error);
    }
  };

  if (showResults) {
    const score = calculateScore();
    const planets = calculatePlanets(score);
    const footprintLevel = getFootprintLevel(score);
    
    return (
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <ThemedView style={[styles.scoreCard, { backgroundColor: colors.card }]}>
          <ThemedText style={[styles.scoreText, { color: colors.text }]}>
            Sua pontuação: {score}%
          </ThemedText>
          <ThemedText style={[styles.planetText, { color: colors.text }]}>
            Planetas necessários: {planets}
          </ThemedText>
          <ThemedText style={[styles.footprintText, { color: colors.text }]}>
            Nível do Impacto: {footprintLevel}
          </ThemedText>
          <ThemedText style={[styles.tipsText, { color: colors.text }]}>
            {getHealthTips(score, planets)}
          </ThemedText>

          <ThemedView style={styles.saveContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border,
                }
              ]}
              placeholder="Digite seu nome"
              placeholderTextColor={colors.text + '80'}
              value={nome}
              onChangeText={setNome}
            />
            <Pressable 
              style={[
                styles.saveButton,
                { 
                  backgroundColor: nome.trim() ? colors.primary : colors.disabled,
                  opacity: salvando ? 0.7 : 1
                }
              ]}
              onPress={() => saveResults(score, planets)}
              disabled={!nome.trim() || salvando}
            >
              <ThemedText style={styles.buttonText}>
                {salvando ? 'Salvando...' : 'Salvar Resultado'}
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>

        <Pressable 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => router.replace('/')}
        >
          <ThemedText style={styles.buttonText}>Voltar ao Início</ThemedText>
        </Pressable>

        <Pressable 
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={() => router.push('/historico')}
        >
          <ThemedText style={styles.buttonText}>Ver Histórico</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const currentCategoryQuestions = questions.filter(q => q.category === categories[currentCategory]);

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText style={[styles.categoryTitle, { color: colors.text }]}>
        {categories[currentCategory]}
      </ThemedText>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentCategoryQuestions.map((q, index) => {
          const questionIndex = questions.findIndex(question => 
            question.category === categories[currentCategory] && 
            question.question === q.question
          );
          const isAnswered = answers[questionIndex] !== -1;
          return (
            <Question
              key={index}
              question={q.question}
              options={q.options}
              onAnswer={(answer) => handleAnswer(questionIndex, answer)}
              isAnswered={isAnswered}
            />
          );
        })}
      </ScrollView>
      {isAllCategoriesComplete() && (
        <Pressable 
          style={[
            styles.button,
            { 
              backgroundColor: colors.primary,
              width: width * 0.9,
              alignSelf: 'center'
            }
          ]}
          onPress={() => setShowResults(true)}
        >
          <ThemedText style={styles.buttonText}>Ver Resultados</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  scoreCard: {
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 16,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  planetText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  footprintText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tipsText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  saveContainer: {
    marginTop: 20,
    gap: 12,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  saveButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
}); 