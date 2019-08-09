import React from 'react'

import {
    Text,
    View,
    StyleSheet
} from 'react-native'

const TeamInfo = ({navigation}) => {
    const teamName = navigation.state.params.team_name
    const orgName = navigation.state.params.organisation
    const city = navigation.state.params.city
    const robotName = navigation.state.params.robot_name

    return(
    <View style={[styles.container, {backgroundColor: '#E64C3C'}]}>
        <Text style={styles.textHeader}>City</Text>
        <Text style={styles.text}>{city}</Text>
        <Text></Text>
        <Text style={styles.textHeader}>Organization</Text>
        <Text style={styles.text}>{orgName}</Text>
        <Text></Text>
        <Text style={styles.textHeader}>Team</Text>
        <Text style={styles.text}>{teamName}</Text>
        <Text></Text>
        {robotName !== '' ? <Text style={styles.textHeader}>Robot Name</Text> : <Text></Text>}
        {robotName !== '' ? <Text style={styles.text}>{robotName}</Text> : <Text></Text>}
    </View>
    )
}

TeamInfo.navigationOptions = ({navigation}) => ({
    title: 'Details  '
})

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Arial'
    },
    text: {
        fontSize: 20,
    }
})


export default TeamInfo