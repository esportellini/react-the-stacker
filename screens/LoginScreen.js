import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      navigation.navigate('Home');
    } else {
      Alert.alert('Usuário ou senha inválidos.');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerText}>Login</Text>
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
        <Text style={commonStyles.label}>Senha:</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#0056b3" />
        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} color="#28a745" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LoginScreen;