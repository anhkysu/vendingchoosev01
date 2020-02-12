import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProcessCashTransaction from './pages/ProcessCashTransaction';
import ProcessMomoTransaction from './pages/ProcessMomoTransaction';
import SettingPage1 from './pages/SettingPage1';
import SettingPage2 from './pages/SettingPage2';
import SettingMenuPage from './pages/SettingMenuPage';
import reducers from './redux/reducers';
import Uart from './communication/Uart';
import {
  SlotsManagement,
  SubSlotsManagement,
  Passwords,
  PaymentSettings,
  SerialPortSettings,
  InformationSettings,
  ProgramUpdate,
  SlotLinks,
  MachineSettings,
  LayoutSettings,
  ProductSettings,
  SubProductSettings,
  TestMachine,
  ErrorSlots,
  GetDataSettings,
  PushCashSetting,
} from './pages/setting';

const store = createStore(reducers);

const StackNavigator = createStackNavigator(
  {
    LoginPage: {
      screen: LoginPage,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'LOGIN PAGE',
      }),
    },
    SettingMenuPage: {
      screen: SettingMenuPage,
      navigationOptions: ({navigation}) => ({
        headerLeft: null,
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'MAIN SETTING PAGE',
      }),
    },
    InformationSettings: {
      screen: InformationSettings,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'INFORMATION SETTINGS',
      }),
    },
    MachineSettings: {
      screen: MachineSettings,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'MACHINE SETTINGS',
      }),
    },
    Passwords: {
      screen: Passwords,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'PASSWORDS',
      }),
    },
    PaymentSettings: {
      screen: PaymentSettings,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'PAYMENT SETTINGS',
      }),
    },
    PushCashSetting: {
      screen: PushCashSetting,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'Push Cash',
      }),
    },
    ProgramUpdate: {
      screen: ProgramUpdate,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'PROGRAM UPDATE',
      }),
    },

    SerialPortSettings: {
      screen: SerialPortSettings,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'SERIAL PORT SETTINGS',
      }),
    },
    SlotLinks: {
      screen: SlotLinks,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'SLOT LINKS',
      }),
    },
    SlotsManagement: {
      screen: SlotsManagement,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'SLOTS MANAGEMENT',
      }),
    },
    SubSlotsManagement: {
      screen: SubSlotsManagement,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'SPECIFIC SLOTS MANAGEMENT',
      }),
    },
    LayoutSettings: {
      screen: LayoutSettings,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'LAYOUT SETTINGS',
      }),
    },
    ProductSettings: {
      screen: ProductSettings,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'PRODUCT SETTINGS',
      }),
    },
    SubProductSettings: {
      screen: SubProductSettings,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'SPECIFIC PRODUCT SETTINGS',
      }),
    },
    TestMachine: {
      screen: TestMachine,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'TEST MACHINE',
      }),
    },
    ErrorSlots: {
      screen: ErrorSlots,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'ERROR SLOTS',
      }),
    },
    GetDataSettings: {
      screen: GetDataSettings,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'GETTING DATA',
      }),
    },
    SettingPage1: {
      screen: SettingPage1,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'SETTING PAGE 1',
      }),
    },
    SettingPage2: {
      screen: SettingPage2,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#3e81f4', fontWeight: 'bold'},
        title: 'SETTING PAGE 2',
      }),
    },
  },
  {
    initialRouteName: 'LoginPage', //LoginPage
  },
);

const StackNavigatorPublic = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  CashTransaction: {
    screen: ProcessCashTransaction,
    navigationOptions: ({navigation}) => ({
      header: null,
      headerStyle: {backgroundColor: 'lightblue'},
    }),
  },
  MomoTransaction: {
    screen: ProcessMomoTransaction,
    navigationOptions: ({navigation}) => ({
      headerLeft: null,
      headerStyle: {backgroundColor: 'lightblue'},
    }),
  },
});

const SwitchNavigator = createSwitchNavigator({
  Public: {
    screen: StackNavigatorPublic,
  },
  SettingFlow: {
    screen: StackNavigator,
  },
});

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <AppContainer />
          <Uart />
        </View>
      </Provider>
    );
  }
}
