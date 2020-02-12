import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import LoginPageReducer from './LoginPageReducer';
import settingpage1reducer from './SettingPage1Reducer';
import uartReducer from './uartReducer';

export default combineReducers({ 
    settingpage1reducer: settingpage1reducer,
    uart: uartReducer
});
