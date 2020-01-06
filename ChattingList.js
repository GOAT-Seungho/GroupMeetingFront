import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CustomButton from './CustomButton';

export default class RoomList extends Component {
  static navigationOptions = {
    title: '채팅 방 리스트',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>채팅 방 리스트 페이지</Text>
      </View>
    );
  }
}
