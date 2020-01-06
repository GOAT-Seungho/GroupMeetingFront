import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CustomButton from './CustomButton';

const {width: WIDTH} = Dimensions.get('window');

export default class CreateRoom extends Component {
  static navigationOptions = {
    title: '방 만들기',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      searchedUsername: '',
      selectedList: [],
      roomCreated: false,
    };
  }

  handleUsername = text => {
    this.setState({username: text});
  };

  _search = username => {
    fetch(`http://172.17.64.77:3000/user/find/` + username).then(res => {
      if (res.status === 404) {
        console.log('찾는 사람 없어요 !');
      } else {
        return res.json().then(body => {
          console.log(body);
          this.setState({
            searchedUsername: body.name,
          });
        });
      }
    });
  };

  handleSelectedList = selectedUser => {
    const {selectedList} = this.state;
    console.log(this.state.selectedList);
    if (selectedList.length < 3) {
      this.setState({
        selectedList: selectedList.concat(selectedUser),
      });
    }
  };

  _createRoom() {
    const {selectedList} = this.state;
    const num = selectedList.length + 1;
    if (num === 2) {
      selectedList[1] = '';
      selectedList[2] = '';
    } else if (num === 3) {
      selectedList[2] = '';
    }
    fetch('http://172.17.64.77:3000/room/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: num,
        leader: 'leader',
        member1: selectedList[0],
        member2: selectedList[1],
        member3: selectedList[2],
        gender: 'male',
      }),
    }).then(function(response) {
      if (response.status === 201) {
        console.log('방만들기 성공');
      } else {
        console.log('방만들기 실패');
        console.log(response.status);
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchTextInput}
            placeholder={'이름을 검색하세요.'}
            autoCapitalize={'none'}
            secureTextEntry={false}
            onChangeText={this.handleUsername}
            // autoFocus={true}
          />
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => this._search(this.state.username)}>
            <Text>검색</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchListContainer}>
          <TouchableOpacity
            style={styles.searchedMemberContainer}
            onPress={() =>
              this.handleSelectedList(this.state.searchedUsername)
            }>
            <Text style={styles.searchedMember}>
              {this.state.searchedUsername}
            </Text>
          </TouchableOpacity>
          <View
            style={{width: '100%', borderBottomWidth: 0.5, borderColor: '#444'}}
          />
        </View>
        <View style={styles.selectedListContainer}>
          <Text style={styles.selectedMember}>{this.state.selectedList}</Text>
        </View>
        <View style={styles.submitBtnContainer}>
          <CustomButton
            buttonColor={'#023e73'}
            title={'방 만들기'}
            onPress={() => {
              this._createRoom();
              this.props.navigation.navigate('Room_1');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: 'row',
  },
  searchTextInput: {
    height: 40,
    borderColor: 'gray',
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 10,
    flex: 4,
    marginRight: 10,
  },
  searchBtn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
  },
  searchListContainer: {
    flex: 4,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'gray',
    width: '100%',
  },
  searchedMemberContainer: {
    // height: 30,
  },
  searchedMember: {
    fontSize: 40,
    paddingLeft: 14,
    backgroundColor: 'red',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  selectedListContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    width: '100%',
  },
  selectedMember: {
    fontSize: 32,
    paddingLeft: 10,
  },
  submitBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    width: '100%',
  },
});
