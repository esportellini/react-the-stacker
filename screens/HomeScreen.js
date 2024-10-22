import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';

const HomeScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(await AsyncStorage.getItem('currentUser'));
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    await AsyncStorage.removeItem('currentUser');
    Alert.alert('Você foi desconectado.');
    navigation.navigate('Login');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerText}>Bem-vindo, {currentUser?.name}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Goals')}>
          <Text style={styles.buttonText}>Metas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reviews')}>
          <Text style={styles.buttonText}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reports')}>
          <Text style={styles.buttonText}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelfAssessment')}>
          <Text style={styles.buttonText}>Autoavaliação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    flexBasis: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;