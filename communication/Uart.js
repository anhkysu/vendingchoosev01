//#region Import
import React, {Component} from 'react';
import {DeviceEventEmitter, Alert} from 'react-native';

import {RNSerialport, definitions, actions} from 'react-native-serialport';
import {receiveUartData} from '../redux/actions';
import {connect} from 'react-redux';

//#endregion

class Uart extends Component {
  constructor(props) {
    super(props);
    //#region - STATE
    this.state = {
      isProcessing: false,
      isVisible: false,
      isNotif: true,
      notifTitle: 'Thông báo',
      notifDescription: 'None',
      notifButton: [],
      numberofslot: 16,
      numberofcolumns: 3,
      minbeverageitemwidth: 150,
      minbeverageitemheight: 130,
      numberofpages: 1,
      currentpagenumber: 1,
      numberofpages_fakearray: [],
      importantdata: [],
      cashavailable: 0,
      pickedItem: {},
      servisStarted: false,
      connected: false,
      usbAttached: false,
      output: '',
      outputArray: [],
      baudRate: this.props.serialPortSettings[1].datainput,
      parity: this.props.serialPortSettings[3].datainput,
      interface: '-1',
      sendText: 'HELLO',
      returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING,
      refreshTime: 1,
    };
    //#endregion
    this.startUsbListener = this.startUsbListener.bind(this);
    this.stopUsbListener = this.stopUsbListener.bind(this);
  }

  //#region - Usb Serial Interface
  startUsbListener() {
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STARTED,
      this.onServiceStarted,
      this,
    );

    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STOPPED,
      this.onServiceStopped,
      this,
    );

    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_ATTACHED,
      this.onDeviceAttached,
      this,
    );

    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_DETACHED,
      this.onDeviceDetached,
      this,
    );

    DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
    DeviceEventEmitter.addListener(
      actions.ON_CONNECTED,
      this.onConnected,
      this,
    );

    DeviceEventEmitter.addListener(
      actions.ON_DISCONNECTED,
      this.onDisconnected,
      this,
    );

    DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
    RNSerialport.setReturnedDataType(this.state.returnedDataType);
    RNSerialport.setDataBit(definitions.DATA_BITS.DATA_BITS_8);
    RNSerialport.setStopBit(definitions.STOP_BITS.STOP_BITS_1);
    RNSerialport.setAutoConnectBaudRate(Number(this.state.baudRate));
    RNSerialport.setParity(Number(this.state.parity));
    RNSerialport.setInterface(parseInt(this.state.interface, 10));
    RNSerialport.setAutoConnect(true);
    RNSerialport.startUsbService();
  }

  stopUsbListener = async () => {
    DeviceEventEmitter.removeAllListeners();
    const isOpen = await RNSerialport.isOpen();
    if (isOpen) {
      RNSerialport.disconnect();
    }
    RNSerialport.stopUsbService();
  };

  onServiceStarted(response) {
    this.setState({servisStarted: true});
    if (response.deviceAttached) {
      this.onDeviceAttached();
    }
  }

  onServiceStopped() {
    this.setState({servisStarted: false});
  }

  onDeviceAttached() {
    this.setState({usbAttached: true});
  }

  onDeviceDetached() {
    this.setState({usbAttached: false});
  }

  onConnected() {
    this.setState({connected: true});
  }

  onDisconnected() {
    this.setState({connected: false});
  }

  onError(error) {
    console.log(String(error));
  }

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  onReadData(data) {
    if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
    ) {
      const payload = RNSerialport.intArrayToUtf16(data.payload);
      this.setState({output: this.state.output + payload});
    } else if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
    ) {
      const payload = RNSerialport.hexToUtf16(data.payload);
      if (!this.isJson(payload)) return;
      var inputObject = JSON.parse(payload);
      if(typeof(inputObject) !== 'object') return;

      if (payload === JSON.stringify(this.props.uartReceive)) {
        inputObject.refresh = this.state.refreshTime;
        this.props.receiveUartData(inputObject);
        this.setState({refreshTime: this.state.refreshTime + 1});
        return;
      }
      
      this.props.receiveUartData(inputObject);
      this.setState({refreshTime: 1});
    }
  }

  sendSerialData(string, notStrict) {
    RNSerialport.writeString(string);
  }
  //#endregion

  //#region - Testing Function

  testFunction() {}

  //#endregion

  //#region - Component

  componentDidMount() {
    this.startUsbListener();
    setTimeout(()=>{console.log(JSON.stringify(this.props.uart))},5000)
  }

  componentWillUnmount() {
    this.stopUsbListener();
  }

  componentDidUpdate(prevProps){
    const uartSendData = JSON.stringify(this.props.uartSend);
    const notStrictMode = this.props.notStrictMode || false;
    if(uartSendData !== JSON.stringify(prevProps.uartSend))
    {
       this.sendSerialData(uartSendData, notStrictMode);
    }
  }

  //#endregion

  //#region - Main View

  render() {
    return null;
  }

  //#endregion
}

function mapStateToProps(state) {
  return {
    yeah: state.settingpage1reducer,
    notStrictMode: state.uart.notStrict,
    uartReceive: state.uart.receive,
    uartSend: state.uart.send,
    serialPortSettings: state.settingpage1reducer.serialPortSettings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveUartData: data => dispatch(receiveUartData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Uart);
