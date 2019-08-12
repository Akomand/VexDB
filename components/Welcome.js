import React from 'react'

import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Animated,
    TouchableOpacity
} from 'react-native'


class FadeInView extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }
  
    componentDidMount() {
      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 5000,              // Make it take a while
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

class Welcome extends React.Component {
    render() {
        return(
            <ScrollView style={styles.container}>
                <FadeInView>
                    <Image
                    style={styles.img}
                    source={require('../assets/VEX.png')}/>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.text}> Get Started</Text>
                    </TouchableOpacity>
                </FadeInView>
            </ScrollView>
            )
    }
}

Welcome.navigationOptions = ({navigation}) => ({
    title: '',
    headerStyle: { height:  0, backgroundColor: 'black' },
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    img: {
        width: 160, 
        height: 160,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 500
    },
    text: {
        color: 'red',
        textAlign: 'center',
        fontSize: 20
    }
})
export default Welcome