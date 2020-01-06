import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CustomButton from './CustomButton';

export default class Room_1 extends Component {
  static navigationOptions = {
    title: '미팅 방 1',
  };

  constructor(props) {
    super(props);
    this.state = {
      roomID: 1,
      roomInfo: {},
      allow: {},
    };
    this.getRoomInfo = this.getRoomInfo.bind(this);
  }

  getRoomInfo = roomID => {
    fetch(`http://172.17.64.77:3000/room/` + roomID).then(res => {
      if (res.status === 200) {
        console.log(res.status + '방 정보 불러오기 성공');
        return res.json().then(body => {
          console.log(body);
          this.setState({
            roomInfo: body,
            allow: JSON.parse(body.allow),
          });
          // console.log(Object.keys(this.state.allow));
        });
      } else {
        console.log(res.status + '잘못된 Room ID 입니다 !!!!');
      }
    });
  };

  componentDidMount() {
    this.getRoomInfo(1);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>미팅 방 1</Text>
        <Text>
          {Object.keys(this.state.allow)[0]} :{' '}
          {JSON.stringify(this.state.allow[Object.keys(this.state.allow)[0]])}
        </Text>
        <Text>
          {Object.keys(this.state.allow)[1]} :{' '}
          {JSON.stringify(this.state.allow[Object.keys(this.state.allow)[1]])}
        </Text>
      </View>
    );
  }
}
