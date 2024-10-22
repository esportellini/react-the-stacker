import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../styles';

const ReviewsScreen = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewer, setReviewer] = useState('');
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      const storedReviews = JSON.parse(await AsyncStorage.getItem('reviews')) || [];
      setReviews(storedReviews);
    };
    fetchReviews();
  }, []);

  const handleAddReview = async () => {
    if (reviewer && reviewText) {
      const newReview = { reviewer, reviewText, date: new Date().toLocaleString() };
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      await AsyncStorage.setItem('reviews', JSON.stringify(updatedReviews));
      setReviewer('');
      setReviewText('');
      Alert.alert('Review adicionada com sucesso!');
    } else {
      Alert.alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headerText}>Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={commonStyles.card}>
            <Text style={commonStyles.cardText}>{item.reviewer}</Text>
            <Text style={commonStyles.cardText}>{item.reviewText}</Text>
            <Text style={commonStyles.cardText}>{item.date}</Text>
          </View>
        )}
      />
      <View style={commonStyles.formGroup}>
        <Text style={commonStyles.label}>Revisor:</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Revisor"
          value={reviewer}
          onChangeText={setReviewer}
        />
      </View>
      <View style={commonStyles.formGroup}>
        <Text style={commonStyles.label}>Comentário:</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Comentário"
          value={reviewText}
          onChangeText={setReviewText}
        />
      </View>
      <Button title="Adicionar Review" onPress={handleAddReview} color="#0056b3" />
    </View>
  );
};

export default ReviewsScreen;