import React from 'react'

import { 
    StyleSheet,
    Text, 
    View,
    TouchableHighlight,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native'


class VexButton extends React.Component { 
  constructor(props) {
    super(props) 
  }
  
  
  render() {
    const { teamNum, onSelect = f => f } = this.props;

      return (
          <TouchableOpacity style={styles.button} onPress={() => onSelect()}>
                  <View style={styles.row}>
                      <View>
                        <Text style={styles.text}>{teamNum}</Text>
                      </View>
                  </View>
          </TouchableOpacity>
      )
  }
}
const styles = StyleSheet.create({
    button: {
      margin: 10,
      marginRight: 0,
      marginLeft: 0,
      padding: 10,
      borderWidth: 2,
      borderRadius: 10,
      alignSelf: 'stretch',
      backgroundColor: 'rgba(0,0,0,0.8)'
    },
    
    delButton: {
      padding: 10,
      borderWidth: 2,
      borderRadius: 10,
      alignSelf: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      fontSize: 30,
      margin: 5,
      color: 'grey',
    }
  });

  export default VexButton;