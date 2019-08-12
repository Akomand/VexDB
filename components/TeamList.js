/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  Animated
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { Picker } from 'native-base'

import VexButton from './VexButton'

import states from './States.js'

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 3000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

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
      region: '',
      searchMethod: '',
    }

    this.arrayholder = [];
    this._renderItem = this._renderItem.bind(this);
    this.searchFilterFunction = this.searchFilterFunction.bind(this)
  }

  // Upon mounting 
   componentDidMount() {
      this.setState({fetching: true})
      fetch('https://api.vexdb.io/v1/get_teams?country=United%20States&grade=High%20School')
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


    // Search Options
  searchFilterFunction = text => {
    if(this.state.searchMethod === 'organisation')
    {
      this.setState({
        value: text,
      });

      const newData = this.arrayholder.filter(item => {
        const itemData = item.organisation;
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        teamDetails: newData,
      });
    } else if(this.state.searchMethod === 'number'){
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
    } else if(this.state.searchMethod === 'city'){
      this.setState({
        value: text,
      });

      const newData = this.arrayholder.filter(item => {
        const itemData = item.city;
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        teamDetails: newData,
      });
    } else if(this.state.searchMethod === 'team'){
      this.setState({
        value: text,
      });

      const newData = this.arrayholder.filter(item => {
        const itemData = item.team_name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        teamDetails: newData,
      });
    }
  };


// Upon Picker value change
  onValueChange(value) {
    this.setState({region: value})
    if(value === 'all')
    {
      fetch('https://api.vexdb.io/v1/get_teams?country=United%20States&grade=High%20School')
      .then(response => response.json())
      .then(teams => teams.result.map((product, index) => product))
      .then(teamDetails => {
        this.setState({teamDetails, fetching: false}) 
        this.arrayholder= [...this.state.teamDetails]
        console.log(this.arrayholder)
      })
      .catch(err => console.error('Error fetching', err)) 
    }
    else {
    fetch('https://api.vexdb.io/v1/get_teams?country=United%20States&grade=High%20School&region=' + value)
      .then(response => response.json())
      .then(teams => teams.result.map((product, index) => product))
      .then(teamDetails => {
        this.setState({teamDetails, fetching: false}) 
        this.arrayholder= [...this.state.teamDetails]
        console.log(this.arrayholder)
      })
      .catch(err => console.error('Error fetching', err)) 
    }
  }

  // Upon Search Option Change
  onSearchOptionChange(value) {
    this.setState({searchMethod: value})
  }


  render(){
    return (
      <>
      <SafeAreaView style={{backgroundColor: 'black'}}>
        <View style={[styles.header, {flexDirection: "row"}]}>
          <Image style={{width: 160, height: 160}} source={require('../assets/VEX.png')}/>
          <Text>     </Text>
          {/*<Image style={{width: 140, height: 140}} source={require('../assets/AR_1.png')} />*/}
        </View>

        <Picker
          mode="dropdown"
          style={styles.picker}
          placeholder='Choose a Region'
          placeholderStyle={{color: 'lightgrey'}}
          selectedValue={this.state.region}
          onValueChange={this.onValueChange.bind(this)}>
          {states.map((value, index) => 
            {
              return <Picker.Item key={index} label={value.label} value={value.value} />
              })}
        </Picker>
        
        <Picker
          mode="dropdown"
          style={[styles.picker, {marginTop: 10, marginBottom: 10}]}
          placeholder='Search By...'
          placeholderStyle={{color: 'lightgrey'}}
          selectedValue={this.state.searchMethod}
          onValueChange={this.onSearchOptionChange.bind(this)}>
          <Picker.Item label='Search By...' />
          <Picker.Item label='Team Number' value='number' />
          <Picker.Item label='Team Name' value='team' />
          <Picker.Item label='School' value='organisation' />
          <Picker.Item label='Team City' value='city' />
        </Picker>

        </SafeAreaView>

      <SearchBar
        placeholder="Search Teams"
        value={this.state.value}
        onChangeText={text => this.searchFilterFunction(text)} // now we are using the correct function to capture the text
      />
      <Text style={[styles.header, {color: 'darkred', fontSize: 30, fontWeight: 'bold'}]}>TEAMS</Text>
        <ScrollView style={{backgroundColor: 'darkred'}}>
          <ActivityIndicator size="large" color='black' style={styles.spinner} animating={this.state.fetching} />
          {/*<FlatList
          data={this.state.productDetails}
          keyExtractor={(item, index) => 'key'+index}
          renderItem={this._renderItem}
          />*/}
          <FadeInView>
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            extraData={this.state} 
            data={this.state.teamDetails}
            renderItem={this._renderItem}
          />
          </FadeInView>
        </ScrollView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'darkred'
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
    height: 180,
    width: 60,
    alignSelf: 'center',
  },
  picker: {
    backgroundColor: 'darkred',
    borderWidth: 5,
    borderColor: 'darkred'
  }
});

export default TeamList;
