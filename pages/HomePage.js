import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { RNSerialport, definitions, actions } from 'react-native-serialport';
import RenderRow from "../components/RenderRow";
import PageButtonItem from "../components/PageButtonItem";
import PaymentMethodPicker from "../components/PaymentMethodPicker";
import {connect} from 'react-redux';
import {findMaxNumberOfColumn, findMaxNumberOfRow, createFakeArray, findNextPage, processFullData, isNotZero} from './layoututils';
import Modal from 'react-native-modal';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      numberofslot: 16,
      numberofcolumns: 3,
      minbeverageitemwidth: 150,
      minbeverageitemheight: 130,
      numberofpages: 1,
      currentpagenumber: 1,
      numberofpages_fakearray: [{ id: "1" }],
      importantdata: [],
      cashavailable: 10000,
      pickedItemId: "Bò húc",
      servisStarted: false,
      connected: false,
      usbAttached: false,
      output: "",
      outputArray: [],
      baudRate: "9600",
      interface: "-1",
      sendText: "HELLO",
      returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING
    };
    this.startUsbListener = this.startUsbListener.bind(this);
    this.stopUsbListener = this.stopUsbListener.bind(this);
    this.slidinginterval = setInterval(()=>{this.onSlidingIntervalTick()}, 5000);
    this.startUsbListener = this.startUsbListener.bind(this);
    this.stopUsbListener = this.stopUsbListener.bind(this);
  }

  processCashReceivedFromVendingMachine(amountofmoney) {
    this.setState({cashavailable: this.state.cashavailable + amountofmoney});} 

  onCancelTransaction(availablecash) {
    if (availablecash <= 0) return;

    if (availablecash >= 10000) {
      this.requestFirmware('Withdraw', 10000);
      Alert.alert(
        "Hủy Thành Công",
        "Mời Bạn Nhận Tiền Thừa" );
      this.setState({cashavailable: 0});
    }

    else {
      Alert.alert(
        "Chú ý", 
        "Rất tiếc! Không thối được tiền có mệnh giá dưới 10000. Bạn muốn hủy số tiền hay nạp thêm tiền?",
        [
          {
            text: 'Nạp thêm',
            onPress: () => console.log('Nạp thêm'),
          },
          {text: 'Hủy', onPress: () => this.setState({cashavailable: 0})},
        ],
        {cancelable: false},
      )
    }
  }

  requestFirmware(action, params) {
    console.log(action + params);
  }

  startUsbListener() {
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STARTED,
      this.onServiceStarted,
      this
    );

    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STOPPED,
      this.onServiceStopped,
      this
    );

    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_ATTACHED,
      this.onDeviceAttached,
      this
    );

    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_DETACHED,
      this.onDeviceDetached,
      this
    );

    DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
    DeviceEventEmitter.addListener(
      actions.ON_CONNECTED,
      this.onConnected,
      this
    );

    DeviceEventEmitter.addListener(
      actions.ON_DISCONNECTED,
      this.onDisconnected,
      this
    );

    DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
    RNSerialport.setReturnedDataType(this.state.returnedDataType);
    RNSerialport.setDataBit(definitions.DATA_BITS.DATA_BITS_8);
    RNSerialport.setStopBit(definitions.STOP_BITS.STOP_BITS_1);
    RNSerialport.setAutoConnectBaudRate(9600);
    RNSerialport.setInterface(parseInt(this.state.interface, 10));
    RNSerialport.setAutoConnect(true);
    RNSerialport.startUsbService();
  };

  stopUsbListener = async () => {
    DeviceEventEmitter.removeAllListeners();
    const isOpen = await RNSerialport.isOpen();
    if (isOpen) {
      Alert.alert("isOpen", isOpen);
      RNSerialport.disconnect();
    }
    RNSerialport.stopUsbService();
  };

  onServiceStarted(response) {
    this.setState({ servisStarted: true });
    if (response.deviceAttached) {
      this.onDeviceAttached();
    }
  }

  onServiceStopped() {
    this.setState({ servisStarted: false });
  }

  onDeviceAttached() {
    this.setState({ usbAttached: true });
  }

  onDeviceDetached() {
    this.setState({ usbAttached: false });
  }

  onConnected() {
    this.setState({ connected: true });
  }

  onDisconnected() {
    this.setState({ connected: false });
  }

  onError(error) {
    console.error(error);
  }

  onReadData(data) {
    if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
    ) {
      const payload = RNSerialport.intArrayToUtf16(data.payload);
      this.setState({ output: this.state.output + payload });
    } else if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
    ) {
      const payload = RNSerialport.hexToUtf16(data.payload);
      this.setState({ output: this.state.output + payload });
    }
  }

  sendSerialData(string){
    RNSerialport.writeString(string);
  }

  navigateBetweenPages(currentpagenumber, forwarddirection, numberofpages){
    var nextpage = findNextPage(currentpagenumber, forwarddirection, numberofpages);
    this.loadBeveragePage(nextpage);
  }

  loadBeveragePage(pagenumber){
    if(pagenumber > this.state.numberofpages) {
      Alert.alert("Warning, Page Number exceeds limit");
      return;
    }
    else {
      this.renderBeverageData(this.props.settingdatalist[1].datainput, this.props.settingdatalist[0].datainput, this.props.initialbeveragestate, pagenumber);
      this.setState({currentpagenumber: pagenumber});
    }
  }

  initializeLayout(noofcol, noofslot) {
    const maxnumberofcol = findMaxNumberOfColumn(Dimensions.get('window').width ,150);
    const maxnumberofrow = findMaxNumberOfRow(Dimensions.get('window').height,  130);
    if (noofcol > maxnumberofcol) {
      noofcol = maxnumberofcol;
    }
    var noofpages = Math.ceil(noofslot / (maxnumberofrow * noofcol));
    this.setState({numberofpages: noofpages});
    setTimeout(() => { 
      var fakearray = createFakeArray(this.state.numberofpages); 
      this.setState({numberofpages_fakearray: fakearray});
    },1);
    return noofpages
  }

  renderBeverageData(noofcol, noofslot, data, pagenumber){
    var numberofpages = this.initializeLayout(noofcol, noofslot);
    var processedData = processFullData(noofcol, noofslot, data, pagenumber, numberofpages);
    console.log(processedData);
    this.setState({importantdata: processedData});
  }

  autoSwitchToOtherPages(numberofpages, currentpagenumber){
    if(currentpagenumber == numberofpages)
    {
      this.loadBeveragePage(1);
    }
    else {
      this.navigateBetweenPages(currentpagenumber, true, numberofpages);
    }
  }

  onSlidingIntervalTick() {
    this.autoSwitchToOtherPages(
      this.state.numberofpages,
      this.state.currentpagenumber,
    );
  }

  processSlidingInterval(intervalnumber){
    var intervalnumberyeah = intervalnumber;
    if (intervalnumberyeah < 10000) {
      intervalnumberyeah = 10000;
    }
    clearInterval(this.slidinginterval);
    this.slidinginterval = setInterval(() => {
      this.onSlidingIntervalTick();
    }, intervalnumberyeah);
  }

  processTransaction(transactionApproved, isCash){
    if(transactionApproved){
      if(isCash) {this.props.navigation.navigate('CashTransaction', {id:`${this.state.pickedItemId}`});}
      else {this.props.navigation.navigate('MomoTransaction', {id:`${this.state.pickedItemId}`});}
    }
    else {
      this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));
    }
    this.setState({isVisible: false});
  }

  onOneItemTouched(lala){
    this.setState({isVisible: true});
    this.setState({pickedItemId: lala});
    clearInterval(this.slidinginterval);
  }

  componentDidMount() {
    this.renderBeverageData(this.props.settingdatalist[1].datainput, this.props.settingdatalist[0].datainput, this.props.initialbeveragestate, 1, this.state.numberofpages);
    this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));
  }

  componentWillUnmount(){
    clearInterval(this.slidinginterval);
  }

  render() {
    return (
      <View style={{ display: "flex", flex: 1 }}>
        <Modal transparent={true} isVisible={this.state.isVisible}>
          <View style={{display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <PaymentMethodPicker onTransactionRequired={(transactionApproved, isCash)=>{this.processTransaction(transactionApproved, isCash)}} />
          </View>
        </Modal>
        <View style={{ height: 40, alignItems: "center", justifyContent: "flex-start", paddingLeft: 20, flexDirection: "row" }}>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: 19, color: "#3e81f4" }}>WELCOME TO ICOCO!</Text>
            </View>
            <View style={{flex: 1, display: "flex", alignItems: "flex-end", paddingRight: 30}}>
                <Text style={{ fontWeight: "bold", fontSize: 19, color: "green" }}>
                  ĐÃ NẠP: {this.state.cashavailable} VNĐ
                </Text>
            </View>
        </View>

        <View style={{ display: "flex", flex: 1, padding: 5 }}>
          <View style={{ display: "flex", flex: 1, flexDirection: "column", paddingHorizontal: 10, marginVertical: 5 }}>
            {
              this.state.importantdata.map((dataItem) => {
                return (
                  <RenderRow
                    myMethod={(data)=> {this.onOneItemTouched(data)}}
                    key={dataItem.rowid}
                    rowDataInput={dataItem.rowdata}
                  />
                )
              })
            }
          </View>

        </View>
        <View style={{ height: 50, width: "100%", backgroundColor: "lightblue", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row" }}>
          <View style={{ width: 150, height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => {this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));}}>
              <Icon
                size={40}
                name="md-help-circle"
                color="#3e81f4"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { this.props.navigation.navigate('LoginPage') }}>
              <Icon
                size={40}
                name="md-settings"
                color="#3e81f4"
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
            <View style={{ height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row" }}>
              <View style={{ width: 45, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={()=>{this.navigateBetweenPages(this.state.currentpagenumber,false, this.state.numberofpages);this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));}}>
                  <Icon
                    size={40}
                    name="ios-arrow-back"
                    color="#3e81f4"
                  />
                </TouchableOpacity>
              </View>

              <View style={{ display: "flex", alignItems: "center", paddingHorizontal: 10, flexDirection: "row" }}>
                {
                  this.state.numberofpages_fakearray.map((pageArray) => {
                    return (
                      <TouchableOpacity key={pageArray.id} onPress={(index) => { this.renderBeverageData(this.props.settingdatalist[1].datainput, this.props.settingdatalist[0].datainput, this.props.initialbeveragestate, pageArray.id, this.state.numberofpages); this.setState({currentpagenumber: pageArray.id});this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));}}>
                        <PageButtonItem pagenumber={pageArray.id} />
                      </TouchableOpacity>
                    )
                  })
                }
              </View>

              <View style={{ width: 45, height: "100%", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={()=>{this.navigateBetweenPages(this.state.currentpagenumber,true, this.state.numberofpages);this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));}}>
                  <Icon
                    size={40}
                    name="ios-arrow-forward"
                    color="#3e81f4"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ width: 150, height: "100%", backgroundColor: "lightblue", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
              {isNotZero(this.state.cashavailable) && (<Button title="Hủy Giao Dịch" onPress={()=>{this.onCancelTransaction(this.state.cashavailable)}}/>)}
          </View>
        </View>
      </View>
    );
  }
};

function mapStateToProps(state){
  return {
    settingdatalist: state.settingdatalist,
    initialbeveragestate: state.initialbeveragestate,
  }
}

function mapDispatchToProps(dispatch){
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);