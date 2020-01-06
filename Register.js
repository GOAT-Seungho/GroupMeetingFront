import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

const {width: WIDTH} = Dimensions.get('window');

export default class Register extends Component {
  state = {
    name: '',
    useremail: '',
    password: '',
    status: null,
    checked: 'first',
    gender: 'male',
  };

  static navigationOptions = {
    title: '회원가입',
  };

  handleName = text => {
    this.setState({name: text});
  };

  handleUseremail = text => {
    this.setState({useremail: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  register = (useremail, name, password) => {
    this._postRegisterInfo(name, useremail, password);
    Alert.alert(
      'Useremail : ' +
        useremail +
        '\n' +
        'Name : ' +
        name +
        '\n' +
        'Password : ' +
        password,
    );
  };

  _postRegisterInfo() {
    const {useremail, password, name, gender} = this.state;

    fetch('http://172.17.64.77:3000/user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: useremail,
        password: password,
        name: name,
        gender: gender,
      }),
    }).then(function(response) {
      console.log(response.status);
    });
  }

  render() {
    const {checked} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text>Register</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Useremail'}
          autoCapitalize={'none'}
          secureTextEntry={false}
          onChangeText={this.handleUseremail}
          autoFocus={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Name'}
          autoCapitalize={'none'}
          secureTextEntry={false}
          onChangeText={this.handleName}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Password'}
          autoCapitalize={'none'}
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <View style={styles.genderBtnContainer}>
          <RadioButton
            value="male"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({checked: 'first', gender: 'male'});
            }}
          />
          <Text>Male</Text>
          <RadioButton
            value="female"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => {
              this.setState({checked: 'second', gender: 'female'});
            }}
          />
          <Text>Female</Text>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.register(
              this.state.useremail,
              this.state.name,
              this.state.password,
            )
          }>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: WIDTH - 55,
    height: 40,
    borderColor: 'gray',
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 10,
    marginTop: 15,
  },
  genderBtnContainer: {
    // alignItems: 'baseline',
    // backgroundColor: 'blue',
  },
  btnSubmit: {
    marginTop: 20,
    width: WIDTH - 200,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});
