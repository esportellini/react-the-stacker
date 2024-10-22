import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import GoalsScreen from './screens/GoalsScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import ReportsScreen from './screens/ReportsScreen';
import SelfAssessmentScreen from './screens/SelfAssessmentScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="SelfAssessment" component={SelfAssessmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;