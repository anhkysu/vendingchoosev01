import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SettingPage1 from "./pages/SettingPage1";
import SettingPage2 from "./pages/SettingPage2";
import settingpage1reducer from "./redux/reducers/SettingPage1Reducer"


const store = createStore(settingpage1reducer);

const StackNavigator = createStackNavigator({
  LoginPage: {
    screen: LoginPage,
    navigationOptions: ({navigation})=>({
      headerTitleStyle :{color: "#3e81f4", fontWeight: "bold"},
      title: "LOGIN PAGE"
    }),
  },
  SettingPage1: {
    screen: SettingPage1,
    navigationOptions: ({navigation})=>({
      headerTitleStyle :{color: "#3e81f4", fontWeight: "bold"},
      title: "MAIN SETTING PAGE"
    }),
  },
  SettingPage2: {
    screen: SettingPage2,
    navigationOptions: ({navigation})=>({
      headerTitleStyle :{color: "#3e81f4", fontWeight: "bold"},
      title: "SETTING PAGE 2"
    }),
  },
}, {
  initialRouteName: "LoginPage"
});

const SwitchNavigator = createSwitchNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: ({navigation})=>({
      headerTitleStyle :{color: "#3e81f4", fontWeight: "bold"},
      title: "WELCOME TO ICOCO"
    }),
  },
  SettingFlow: {
    screen: StackNavigator,
  },
});

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends Component{
  render(){
    return (
      <Provider store={store}>
          <AppContainer/>
      </Provider>
    );
  }
}
