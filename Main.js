import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {View, Text} from 'react-native';
import CustomButton from './CustomButton';
import RoomListScreen from './RoomList';
import ChattingListScreen from './ChattingList';
import CreateRoomScreen from './CreateRoom';
import Room_1_Screen from './Room_1';

class MainScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>로그인 완료 시 나타나는 메인 페이지</Text>
        <CustomButton
          buttonColor={'#023e73'}
          title={'미팅 방 리스트'}
          onPress={() => this.props.navigation.navigate('RoomList')}
        />
        <CustomButton
          buttonColor={'#023e73'}
          title={'채팅 방 리스트'}
          onPress={() => this.props.navigation.navigate('ChattingList')}
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Main: MainScreen,
    RoomList: RoomListScreen,
    ChattingList: ChattingListScreen,
    CreateRoom: CreateRoomScreen,
    Room_1: Room_1_Screen,
  },
  {
    initialRouteName: 'Main',
  },
);

const MainContainer = createAppContainer(MainStack);

export default class Main extends Component {
  render() {
    return <MainContainer />;
  }
}
