import React, {Fragment} from 'react';

import {
  AppRegistry
} from 'react-native';

import TeamList from './components/TeamList'
import TeamInfo from './components/TeamInfo'
import Welcome from './components/Welcome'

import { createStackNavigator, createAppContainer} from 'react-navigation'


import { tsThisType } from '@babel/types';


const MainNavigator = createStackNavigator({
  Welcome: {screen: Welcome},
  Home: {screen: TeamList},
  Details: { screen: TeamInfo}
}, {headerLayoutPreset: 'center'});

const App = createAppContainer(MainNavigator);


AppRegistry.registerComponent('TeamList', () => App);

export default App;