import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';

const ProfileScreen = () => {
  const [user, setUser] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        Alert.alert('Você não está logado. Redirecionando para a tela de login...');
        navigation.navigate('Login');
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    let users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    users = users.map(u => (u.username === user.username ? user : u));
    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    Alert.alert('Perfil atualizado com sucesso!');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerText}>Perfil</Text>
      <View style={commonStyles.formGroup}>
        <Text style={commonStyles.label}>Nome de Usuário:</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Username"
          value={user.username}
          onChangeText={(text) => setUser({ ...user, username: text })}
        />
      </View>
      <View style={commonStyles.formGroup}>
        <Text style={commonStyles.label}>E-mail:</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Email"
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
      </View>
      <Button title="Update Profile" onPress={handleUpdateProfile} color="#0056b3" />
    </View>
  );
};

export default ProfileScreen;