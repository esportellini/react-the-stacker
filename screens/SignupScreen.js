import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';
import Footer from '../components/Footer'; // Certifique-se de ajustar o caminho conforme necessário

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    let users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      Alert.alert('Usuário já existe! Tente outro nome de usuário.');
      return;
    }

    users.push({ username, email, password });
    await AsyncStorage.setItem('users', JSON.stringify(users));
    Alert.alert('Registro concluído! Você pode agora fazer login.');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={commonStyles.headerText}>Registro</Text>
        <View style={commonStyles.formGroup}>
          <Text style={commonStyles.label}>Nome de Usuário:</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={commonStyles.formGroup}>
          <Text style={commonStyles.label}>Email:</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={commonStyles.formGroup}>
          <Text style={commonStyles.label}>Senha:</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Button title="Registrar" onPress={handleSignup} color="#0056b3" />
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
});

export default SignupScreen;