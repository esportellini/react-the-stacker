import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';

const ReportsScreen = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      const storedAssessments = JSON.parse(await AsyncStorage.getItem('assessments')) || [];
      setAssessments(storedAssessments);
    };
    fetchAssessments();
  }, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerText}>Relatórios de Desempenho</Text>
      <FlatList
        data={assessments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={commonStyles.card}>
            <Text style={commonStyles.cardText}>Relatório {index + 1}</Text>
            <Text style={commonStyles.cardText}>Desempenho Geral: {'★'.repeat(item.q1)}{'☆'.repeat(5 - item.q1)}</Text>
            <Text style={commonStyles.cardText}>Capacidade de Trabalhar em Equipe: {'★'.repeat(item.q2)}{'☆'.repeat(5 - item.q2)}</Text>
            <Text style={commonStyles.cardText}>Habilidade de Comunicação: {'★'.repeat(item.q3)}{'☆'.repeat(5 - item.q3)}</Text>
            <Text style={commonStyles.cardText}>Capacidade de Cumprir Prazos: {'★'.repeat(item.q4)}{'☆'.repeat(5 - item.q4)}</Text>
            <Text style={commonStyles.cardText}>Proatividade: {'★'.repeat(item.q5)}{'☆'.repeat(5 - item.q5)}</Text>
            <Text style={commonStyles.cardText}>Data da Avaliação: {new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReportsScreen;