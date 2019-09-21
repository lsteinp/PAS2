  
import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import CadastrarAlunoScreen from './src/screens/CadastrarAlunoScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    CadastrarAluno: CadastrarAlunoScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}