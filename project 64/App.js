import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Header } from 'react-native-elements';
import HomeScreen from './screens/HomeScreen.js';
import database from './database.js';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      word: "",
      lexicalCategory: '',
      examples: [],
      definition: ''
    };
  }
  render(){
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#68B7DF'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#FFFFFF', fontSize: 20 },
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ 
              text: text,
              isSearchedPressed: false,
              word: "Loading...",
              lexicalCategory: '',
              examples: [],
              definition: ''
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            var word = dictionary[text]["word"];
            var lexicalCategory = dictionary[text]["lexicalCategory"];
            var definition = dictionary[text]["definition"];
            this.setState({
              "word": word,
              "lexicalCategory": lexicalCategory,
              "definition": definition
            })
            database[word] ? (
              this.setState({ "word": word })
            ) : (
              Alert.alert("This word is not in our database. Sorry")
            )

            database[lexicalCategory] ? (
              this.setState({ "lexicalCategory": lexicalCategory })
            ) : (
              Alert.alert("This word is not in our database. Sorry")
            )

            database[definition] ? (
              this.setState({ "definition": definition })
            ) : (
              Alert.alert("This word is not in our database. Sorry")
            )
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    marginTop: 100,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
});
