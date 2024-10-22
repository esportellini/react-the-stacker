import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer'; // Certifique-se de ajustar o caminho conforme necessário

const questions = [
  'Como você avalia sua produtividade hoje?',
  'Como você avalia sua comunicação com a equipe?',
  'Como você avalia sua capacidade de resolver problemas?',
  'Como você avalia sua adaptação a mudanças?',
  'Como você avalia seu aprendizado contínuo?'
];

const SelfAssessmentScreen = () => {
  const [ratings, setRatings] = useState({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 });

  const handleRating = (question, value) => {
    setRatings({ ...ratings, [question]: value });
  };

  const handleSubmit = async () => {
    const newAssessment = { ...ratings, date: new Date().toISOString() };
    const assessments = JSON.parse(await AsyncStorage.getItem('assessments')) || [];
    assessments.push(newAssessment);
    await AsyncStorage.setItem('assessments', JSON.stringify(assessments));
    Alert.alert('Autoavaliação enviada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Autoavaliação</Text>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question}</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(value => (
                <TouchableOpacity
                  key={value}
                  onPress={() => handleRating(`q${index + 1}`, value)}
                  style={styles.starButton}
                >
                  <Text style={value <= ratings[`q${index + 1}`] ? styles.starSelected : styles.star}>
                    {value <= ratings[`q${index + 1}`] ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80, // Espaço para o footer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starButton: {
    marginHorizontal: 5,
  },
  star: {
    fontSize: 30,
    color: '#ccc',
  },
  starSelected: {
    fontSize: 30,
    color: '#ffd700',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelfAssessmentScreen;