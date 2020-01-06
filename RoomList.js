import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CustomButton from './CustomButton';

export default class RoomList extends Component {
  static navigationOptions = {
    title: '미팅 방 리스트',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'pink',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            buttonColor={'#023e73'}
            title={'방 만들기'}
            onPress={() => this.props.navigation.navigate('CreateRoom')}
          />
        </View>
        <View
          style={{
            width: '100%',
            flex: 2,
            backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>미팅 방 리스트</Text>
          <CustomButton
            buttonColor={'#023e73'}
            title={'미팅 방 1'}
            onPress={() => this.props.navigation.navigate('Room_1')}
          />
          <CustomButton
            buttonColor={'#023e73'}
            title={'미팅 방 2'}
            onPress={() => this.props.navigation.navigate('Room_1')}
          />
          <CustomButton
            buttonColor={'#023e73'}
            title={'미팅 방 3'}
            onPress={() => this.props.navigation.navigate('Room_1')}
          />
          <CustomButton
            buttonColor={'#023e73'}
            title={'미팅 방 4'}
            onPress={() => this.props.navigation.navigate('Room_1')}
          />
          <CustomButton
            buttonColor={'#023e73'}
            title={'미팅 방 5'}
            onPress={() => this.props.navigation.navigate('Room_1')}
          />
        </View>
      </View>
    );
  }
}
