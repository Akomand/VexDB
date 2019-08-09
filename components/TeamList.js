/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Image,
  FlatList
} from 'react-native';

import { SearchBar } from 'react-native-elements';

import VexButton from './VexButton'


class TeamList extends React.Component {

    static navigationOptions = {
        title: '',
        headerStyle: { height:  0, backgroundColor: 'black' },
      }

  constructor(props) {
    super(props)

    const teamDetails = []

    this.state = {
      teamDetails,
      fetching: false,
    }

    this.arrayholder = [];
    this._renderItem = this._renderItem.bind(this);
    this.searchFilterFunction = this.searchFilterFunction.bind(this)
  }

  componentDidMount() {
    this.setState({fetching: true})
    fetch('https://api.vexdb.io/v1/get_teams?country=United%20States&region=Arkansas&grade=High%20School&program=VRC')
    .then(response => response.json())
    .then(teams => teams.result.map((product, index) => product))
    .then(teamDetails => {
      this.setState({teamDetails, fetching: false}) 
      this.arrayholder= [...this.state.teamDetails]
      console.log(this.arrayholder)
    })
    .catch(err => console.error('Error fetching', err))
  }

  _renderItem=({item})=> {
      return (
              <VexButton teamNum={item.number}
                onSelect={() => this.props.navigation.navigate('Details', item)}/>
          )
  }


  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = item.number;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      teamDetails: newData,
    });
  };

  render(){
    return (
      <>
      <SafeAreaView style={{backgroundColor: 'black'}}>
        <View style={[styles.header, {flexDirection: "row"}]}>
          <Image style={{width: 140, height: 140}} source={require('../assets/VEX.png')}/>
          <Text>     </Text>
          <Image style={{width: 140, height: 140}} source={require('../assets/AR_1.png')} />
        </View>
        </SafeAreaView>
      <SearchBar
        placeholder="Search Teams"
        value={this.state.value}
        onChangeText={text => this.searchFilterFunction(text)} // now we are using the correct function to capture the text
      />
      <Text style={[styles.header, {color: '#E64C3C', fontSize: 30, fontWeight: 'bold'}]}>TEAMS</Text>
        <ScrollView style={{backgroundColor: '#E64C3C'}}>
          <ActivityIndicator size="large" color='black' style={styles.spinner} animating={this.state.fetching} />
          {/*<FlatList
          data={this.state.productDetails}
          keyExtractor={(item, index) => 'key'+index}
          renderItem={this._renderItem}
          />*/}
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            extraData={this.state} // <- add this prop
            data={this.state.teamDetails}
            renderItem={this._renderItem}
          />
        </ScrollView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E64C3C'
  },
  header: {
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 3,
    backgroundColor: 'black'
  },
  headerChar: {
    flexDirection: 'row',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Cochin'
  },
  img: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    backgroundColor: 'black'
  },
  spinner: {
    position: 'absolute',
    height: 150,
    width: 60,
    alignSelf: 'center',
  },
});

export default TeamList;
