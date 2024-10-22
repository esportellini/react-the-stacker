import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';

const GoalsScreen = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      const storedGoals = JSON.parse(await AsyncStorage.getItem('goals')) || [];
      setGoals(storedGoals);
    };
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (title && description) {
      const newGoal = { title, description, status: 'Em andamento', date: new Date().toLocaleString() };
      const updatedGoals = [...goals, newGoal];
      setGoals(updatedGoals);
      await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
      setTitle('');
      setDescription('');
      Alert.alert('Meta adicionada com sucesso!');
    } else {
      Alert.alert('Por favor, preencha todos os campos.');
    }
  };

  const handleDeleteGoal = async (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
    Alert.alert('Meta excluída com sucesso!');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerText}>Metas</Text>
      <FlatList
        data={goals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={commonStyles.card}>
            <Text style={commonStyles.cardText}>{item.title}</Text>
            <Text style={commonStyles.cardText}>{item.description}</Text>
            <Text style={commonStyles.cardText}>{item.status}</Text>
            <Text style={commonStyles.cardText}>{item.date}</Text>
            <Button title="Excluir" onPress={() => handleDeleteGoal(index)} color="#0056b3" />
          </View>
        )}
      />
      <View style={commonStyles.formGroup}>
        <Text style={commonStyles.label}>Título:</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={commonStyles.formGroup}>
        <Text style={commonStyles.label}>Descrição:</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <Button title="Adicionar Meta" onPress={handleAddGoal} color="#0056b3" />
    </View>
  );
};

export default GoalsScreen;