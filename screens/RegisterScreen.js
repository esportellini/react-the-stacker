import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    let users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
      Alert.alert('Error', 'Username already exists');
      return;
    }
    users.push({ username, password });
    await AsyncStorage.setItem('users', JSON.stringify(users));
    Alert.alert('Success', 'Registration successful');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerBox}>
        <Text style={styles.title}>Register</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  registerBox: { width: '20%', padding: 20, borderRadius: 10, backgroundColor: '#fff', elevation: 5 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, marginBottom: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default RegisterScreen;