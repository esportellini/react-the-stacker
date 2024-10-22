import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEmployeeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const validateInputs = () => {
    if (!name || !position || !department || !address || !phone || !email) {
      Alert.alert('Error', 'All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email format');
      return false;
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Error', 'Invalid phone number. It should be 11 digits');
      return false;
    }

    return true;
  };

  const handleAddEmployee = async () => {
    if (!validateInputs()) {
      return;
    }

    const newEmployee = { id: Date.now(), name, position, department, address, phone, email };
    let employees = JSON.parse(await AsyncStorage.getItem('employees')) || [];

    // Check if the employee already exists
    if (employees.find(emp => emp.name === name)) {
      Alert.alert('Error', 'Employee already exists');
      return;
    }

    employees.push(newEmployee);
    await AsyncStorage.setItem('employees', JSON.stringify(employees));
    Alert.alert('Success', 'Employee added successfully');
    navigation.navigate('EmployeeList');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Employee</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Position" value={position} onChangeText={setPosition} />
      <TextInput style={styles.input} placeholder="Department" value={department} onChangeText={setDepartment} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TouchableOpacity style={styles.button} onPress={handleAddEmployee}>
        <Text style={styles.buttonText}>Add Employee</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 10, backgroundColor: '#fff' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10, marginBottom: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default AddEmployeeScreen;