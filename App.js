import React, {Fragment} from 'react';

import {
  AppRegistry,
  Alert
} from 'react-native';

import TeamList from './components/TeamList'
import TeamInfo from './components/TeamInfo'

import { createStackNavigator, createAppContainer} from 'react-navigation'


import { tsThisType } from '@babel/types';


const MainNavigator = createStackNavigator({
  Home: {screen: TeamList},
  Details: { screen: TeamInfo}
}, {headerLayoutPreset: 'center'});

const App = createAppContainer(MainNavigator);


AppRegistry.registerComponent('TeamList', () => App);

export default App;