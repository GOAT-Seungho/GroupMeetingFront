import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  Alert,
  View,
  Text,
} from 'react-native';
import CustomButton from './CustomButton';
import RegisterScreen from './Register';
import dispatcher from './Flux';

const {width: WIDTH} = Dimensions.get('window');

class LoginScreen extends Component {
  state = {
    useremail: '',
    password: '',
    status: null,
  };

  constructor(props) {
    super(props);
  }

  handleUseremail = text => {
    this.setState({useremail: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  login = (useremail, password) => {
    this._postLoginInfo(useremail, password);
  };

  _postLoginInfo = (useremail, password) => {
    fetch('http://172.17.64.77:3000/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: useremail,
        password: password,
      }),
    }).then(function(response) {
      console.log(response.status);
      if (response.status === 200) {
        dispatcher.dispatch({
          type: 'change',
        });
      } else {
        alert('로그인 실패');
        console.log(response.status);
      }
    });
  };

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>비로그인일 때 나타나는 로그인 화면</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'이메일을 입력하세요.'}
          autoCapitalize={'none'}
          secureTextEntry={false}
          onChangeText={this.handleUseremail}
          autoFocus={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'비밀번호를 입력하세요.'}
          autoCapitalize={'none'}
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <CustomButton
          buttonColor={'#023e73'}
          title={'로그인'}
          onPress={() => {
            this.login(this.state.useremail, this.state.password);
          }}
        />
        <CustomButton
          buttonColor={'#444'}
          title={'회원가입'}
          onPress={() => this.props.navigation.navigate('Register')}
        />
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
});

const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

const LoginContainer = createAppContainer(LoginStack);

export default class Login extends Component {
  render() {
    return <LoginContainer />;
  }
}
