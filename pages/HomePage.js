//#region Import
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  Alert,
  DeviceEventEmitter,
  ActivityIndicator
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { RNSerialport, definitions, actions } from 'react-native-serialport';
import RenderRow from "../components/RenderRow";
import PageButtonItem from "../components/PageButtonItem";
import PaymentMethodPicker from "../components/PaymentMethodPicker";
import {connect} from 'react-redux';
import {findMaxNumberOfColumn, findMaxNumberOfRow, createFakeArray, findNextPage, processFullData, isNotZero} from './layoututils';
import Modal from 'react-native-modal';
import {processSerialDataToFirmware,
        sendSelectedSlot,
        sendContinueOrCancelTransaction,
        sendUserFeedbackAboutDisabilityOfGivingBackCashChange,
        sendPaymentMethod,
        } from '../business/AppToFirmwareFunctions';
import {onReceivedUiRequirement, 
        onPaymentMethodDisplayRequirement, 
        onUpdateCashAvailable, 
        onGivingBackInputDisabilityDisplayRequirement,
        onReceivedQrCode,
        onSlotStatus} from '../business/FirmwareToAppFunctions';
import Notification from './Notifications';
import { cloneWithoutLoc } from '@babel/types';
//#endregion

class HomePage extends Component {
  constructor(props) {
    super(props);
    //#region - STATE
    this.state = {
      isProcessing: false,
      isVisible: false,
      isNotif: true,
      notifTitle: "Thông báo",
      notifDescription: "None",
      notifButton: [],
      numberofslot: 16,
      numberofcolumns: 3,
      minbeverageitemwidth: 150,
      minbeverageitemheight: 130,
      numberofpages: 1,
      currentpagenumber: 1,
      numberofpages_fakearray: [],
      importantdata: [],
      cashavailable: 15000,
      pickedItem: {},
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
    //#endregion
    this.startUsbListener = this.startUsbListener.bind(this);
    this.stopUsbListener = this.stopUsbListener.bind(this);
    this.slidinginterval = setInterval(() => { this.onSlidingIntervalTick() }, 5000);
    this.showUiPickedProduct = this.showUiPickedProduct.bind(this);
    this.showUiPaymentMethod = this.showUiPaymentMethod.bind(this);
    this.sendSerialData = this.sendSerialData.bind(this);
    this.updateCashAvailable = this.updateCashAvailable.bind(this);
    this.showUiGivingBackInputDisability = this.showUiGivingBackInputDisability.bind(this);
    this.feedbackAboutDisabledGivingBackCash = this.feedbackAboutDisabledGivingBackCash.bind(this);
        this.pickUi = this.pickUi.bind(this);
  }

  //#region - Showing Specific Ui for different purposes
  pickUi(uiId, uiDescription, params){
    this.hideLoadingUi();
    switch (uiId) {
      case 0:
        this.showUiPickedProduct(uiDescription, params);
        break;
      case 1:
        this.showUiPleaseGetProduct(uiDescription, params);
        break;
      case 2:
        this.showUiThankYou(uiDescription, params);
        break;
      case 5:
        this.showUiMomoTransactionStatus(1, false);
        break;
      case 6:
        this.showUiMomoTransactionStatus(1, true);
        break;
      case 7:
        this.showUiMomoLostConnection(uiDescription, params);
        break;
      case 8:
        this.showUiPleaseGetCashRemain(uiDescription, params);
        break;
      case 9:
        break;
      case 10:
        this.showUiCannotGiveCashRemain(uiDescription, params);
        break;
      case 11:
        this.showUiMoreThan50000(uiDescription, params);
        break;
      case 12:
        this.showUiNotEnoughToGiveBack(uiDescription, params);
        break;
      case 13:
        this.showUiSlotError(uiDescription, params);
        break;
      case 14:
        this.showUiSlotOver(uiDescription, params);
        break;
    }
  }

  showUiNotification(title, description, buttonOptions){
    if(buttonOptions == null) {
      buttonOptions = [];
    }
    this.setState(
      {
       notifTitle: title,
       notifDescription: description,
       notifButton: buttonOptions,
       isVisible: true,
       isProcessing: true, 
       isNotif: true,
      }
    );
  }

  hideUiNotification(){
    this.setState({isVisible: false, notifButton:[]});
  }

  showLoadingUi(){
    this.setState({isVisible: true,isProcessing: true, isNotif: false});
  }

  hideLoadingUi(){
    this.setState({isVisible: false, notifButton:[]});
  }

  showUiPickedProduct(thisUiDescription, cashOrMomo){
    console.log(thisUiDescription);
    if(cashOrMomo == "CashTransaction"){
      this.props.navigation.navigate('CashTransaction', 
      {onReturnHome: (data) => this.onReturnHome(data), 
        itemid:`${this.state.pickedItem.slotSetting}`,
        itemname:`${this.state.pickedItem.name}`, 
        itemprice:`${this.state.pickedItem.price}`, 
        cashavailable:`${this.state.cashavailable}`});
    }
    else if(cashOrMomo == "MomoTransaction"){
      this.props.navigation.navigate('MomoTransaction',  
      {onReturnHome: (data) => this.onReturnHome(data), 
        itemid:`${this.state.pickedItem.slotSetting}`, 
        itemname:`${this.state.pickedItem.name}`,
        itemprice:`${this.state.pickedItem.price}`});
    }
  }

  showUiPleaseGetProduct(a,b){
    this.showUiNotification("Thông báo", "Mời Quý Khách nhận sản phẩm ở bên dưới!");
  }

  showUiThankYou(a,b){
    this.showUiNotification("Thông báo", "Xin cảm ơn quý khách!");
  }

  showUiPleaseGetCashRemain(a,b){
    this.showUiNotification("Thông báo", "Xin mời Quý Khách nhận tiền thừa!");
  }

  showUiCannotGiveCashRemain(a,b){
    this.showUiNotification(
    "Thông báo", 
    "Không thể thối tiền thừa cho Quý Khách!",
    [
      {text:"Không cần thối tiền lẻ", onPress: ()=>{this.feedbackAboutDisabledGivingBackCash(true)}},
      {text:"Nạp thêm", onPress: ()=>{this.showUiContinueOrCancel()}}
    ]
    );
  }

  showUiMomoTransactionStatus(a, isSuccessful){
    var infoHere = "Giao dịch Momo" + (isSuccessful ? " thành công!" : " thất bại!");
    this.showUiNotification("Thông báo", infoHere);
  }

  showUiMomoLostConnection(a, b){
    this.showUiNotification("Thông báo", "Mất mạng Internet. Không thể thực hiện giao dịch Momo lúc này!");
  }

  showUiPaymentMethod(){
    this.setState({isVisible: true, isProcessing: false, isNotif: false});
  }

  showUiGivingBackInputDisability(){
    this.showUiNotification("Thông báo", "Xin lỗi, không thể thối tiền vừa đưa vào. Quý khách có muốn mua mà không cần thối tiền lẻ",
    [
      {text: "Không cần thối", onPress: () => {this.feedbackAboutDisabledGivingBackCash(true)}},
      {text: "Rút tiền", onPress: () => {this.feedbackAboutDisabledGivingBackCash(false)}}
    ]
    ,
    { cancelable: false }
    )
  }

  showUiMoreThan50000(a,b){
    this.showUiNotification("Thông báo", "Tổng tiền lớn hơn 50000 vnđ rồi!");
  }

  showUiNotEnoughToGiveBack(a,b){
    this.showUiNotification("Thông báo", "Không đủ tiền thối rồi");
  }

  showUiContinueOrCancel(){
    this.showUiNotification("Thông báo", "Có muốn tiếp tục không",
    [
      {text: "Tiếp tục", onPress: () => {sendContinueOrCancelTransaction(0, this.sendSerialData)}},
      {text: "Hủy", onPress: () => {sendContinueOrCancelTransaction(1, this.sendSerialData)}}
    ]
    ,
    { cancelable: false }
    )
  }

  showUiSlotError(a,b){
    this.showUiNotification("Thông báo", "Slot lỗi rồi");
  }

  showUiSlotOver(a,b){
    this.showUiNotification("Thông báo", "Slot đã hết hàng");
  }
  //#endregion

  //#region - Usb Serial Interface
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

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  onReadData(data){
    if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY
    ) {
      const payload = RNSerialport.intArrayToUtf16(data.payload);
      this.setState({ output: this.state.output + payload }); 
    } else if (
      this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
    ) {
      const payload = RNSerialport.hexToUtf16(data.payload);
      if(!this.isJson(payload)) return;
      var inputObject = JSON.parse(payload);
      var topic = inputObject.topic || 'none';
      var type = inputObject.type || 'none';
      var content = inputObject.content || 'none';
      if(topic == 'none' || content == 'none'){
        console.log("Firmware requests unrecognized!");
      }
      else {
        switch(topic){
          case 'interface':
            if(type != 'request') {
              this.showError('Firmware should send a request with type of request');
              return;
            }
            else {
              onReceivedUiRequirement(content.value, 'none', this.pickUi);
            }
            break;
            
          case 'paymentMethod':
            if(type != 'request'){
              this.showError("Firmware should respond with type of request");
              return;
            }
            else {
              this.hideLoadingUi();
              onPaymentMethodDisplayRequirement(this.showUiPaymentMethod);
            }
            break;

          case 'cashMethod':
            if (type == 'updateMoney') {
              onUpdateCashAvailable("refreshCash", content.value, this.updateCashAvailable);
            }
            else if (type == 'warning') {
              onReceivedUiRequirement(11, "", this.pickUi);
            }
            else if (type == 'request') {
              onGivingBackInputDisabilityDisplayRequirement(this.showUiGivingBackInputDisability);
            }
            break;

          case 'slots':
            if(type == "response"){
              var displayUiId = onSlotStatus(content.value);
              onReceivedUiRequirement(displayUiId,'none',this.pickUi);
            }
            break;
          
          default: 
            break;
        }
      }      
    }
  }

  sendSerialData(string){
    this.showLoadingUi();
    if(this.state.connected){
      RNSerialport.writeString(string);
    }
    else {
      setTimeout(()=>{this.hideLoadingUi();},3000);
    }
  }
  //#endregion

  //#region - Testing Function
  testFunction() {
    //this.showUiPickedProduct("asd","CashTransaction")
    //onReceivedUiRequirement(7, "none", this.pickUi)
    //this.onReadData({"topic":"paymentMethod","type":"request","content":null});
    //this.processTransaction(true,true,10000);
    this.showUiPaymentMethod();
  }
  //#endregion

  //#region - Categorized 
  onOneItemTouched(itemInfoObject) {
    sendSelectedSlot(itemInfoObject.slotSetting, this.sendSerialData);
  }

  updateCashAvailable(inputCashOrRefreshCash, cashValue){
    this.showLoadingUi();
    if(inputCashOrRefreshCash == "inputCash"){
      this.setState({cashavailable: this.state.cashavailable + cashValue});
    }
    else if(inputCashOrRefreshCash == "refreshCash"){
      this.setState({cashavailable: cashValue});
    }
    this.hideLoadingUi();
  }

  onCancelTransaction() {
    sendContinueOrCancelTransaction(0, this.sendSerialData);
  }

  feedbackAboutDisabledGivingBackCash(userAccept){
    sendUserFeedbackAboutDisabilityOfGivingBackCashChange(userAccept, this.sendSerialData);
  }
    
  onReturnHome(data){
    this.showLoadingUi();
    setTimeout(() => {
      this.startUsbListener();
      this.hideLoadingUi();
      switch (data) {
        case 'SUCCESS':
          Alert.alert("Thanh Cong");
          break;
        case 'MOMO FAILED':
          this.showUiMomoTransactionStatus("", false);
          break;
        case 'MOMO TIMEOUT':
          this.showUiMomoTransactionStatus("", false);
          break;
        default:
          break;
      }
    }, 3000);
  }
  
  processTransaction(transactionApproved, isCash, cashavailable){
    if(transactionApproved){
      if(isCash) {
        sendPaymentMethod("cash", this.sendSerialData);
        this.stopUsbListener();
        this.hideLoadingUi();
        this.props.navigation.navigate('CashTransaction', {onReturnHome: (data) => this.onReturnHome(data), itemid:`${this.state.pickedItem.slotSetting}`,itemname:`${this.state.pickedItem.name}`, itemprice:`${this.state.pickedItem.price}`, cashavailable:`${cashavailable}`});
      }
      else {
        sendPaymentMethod("momo", this.sendSerialData);
        this.stopUsbListener();
        this.hideLoadingUi();
        this.props.navigation.navigate('MomoTransaction',  {onReturnHome: (data) => this.onReturnHome(data), itemid:`${this.state.pickedItem.slotSetting}`, itemname:`${this.state.pickedItem.name}`,itemprice:`${this.state.pickedItem.price}`});
      }
    }
    else {
      this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));
    }
    this.setState({isVisible: false});
  }

  //#endregion 

  //#region - Uncategorized Code

  onCashInputFromVM(amountOfCash) {
    var feedbackString = "";
    if(typeof amountOfCash == Number){
      feedbackString = JSON.stringify({topic:"cashinput", type:"response", content: {status: "ok"}});
      this.setState({cashavailable: this.state.cashavailable + amountOfCash});
    }
    else {
      feedbackString = JSON.stringify({topic:"cashinput", type:"response", content: {status: "error", error: "Firmware send wrong data format of cash input"}});
    }
    this.sendSerialData(feedbackString);
}

  withdrawCashFromVM(cashNumber) {
    this.setState({ isProcessing: true, isVisible: true });
    var requestString = JSON.stringify({ topic: "withdrawcash", type: "request", content: { value: cashNumber } });
    if (this.state.connected) {
      this.sendSerialData(requestString);
      return
    }
    setTimeout(() => {
      this.onWithdrawCashResult(true, "Timeout but no response");
    }, 5000);
  }

  onWithdrawCashResult(isSuccess, errorIfExists){
    this.setState({isVisible: false, isProcessing: false});
    if(isSuccess){
      this.setState({cashavailable: 0});
    }
    else {
      this.showError(errorIfExists);
    }
  }

  checkCashRemain(additionalNote){
    this.setState({ isProcessing: true, isVisible: true});
    var requestString = JSON.stringify({topic:"cashremain", type:"request", content: {note: additionalNote}});
    if(this.state.connected){
      this.sendSerialData(requestString);
      return;
    }
    setTimeout(()=>{
      this.onCheckCashRemainResult(false, 'none', 'Timeout but no response');
    },5000);
  }

  onCheckCashRemainResult(isSuccess, value, error ){
    this.setState({isVisible: false, isProcessing: false});
    if(isSuccess){
      if(typeof value == Number){
        this.setState({cashavailable: value})
      }
      else {
        this.showError("Wrong type of cash input");
      }
    }
    else {
      this.showError("Failed to check cash remained from vending machine!")
    }
  }

  respondStatusToFirmware(isOk){
    var responsestring = ( isOk ? JSON.stringify({appstatus:"ok"}) : JSON.stringify({appstatus:"error"}));
    this.sendSerialData(responsestring);
  }

  showError(error){
    console.log(error);
  }

  requestFirmware(action, params) {
    console.log(action + params);
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
    const maxnumberofcol = findMaxNumberOfColumn(Dimensions.get('window').width, Number(this.props.settingdatalist[3].datainput));
    const maxnumberofrow = findMaxNumberOfRow(Dimensions.get('window').height 
                                              - Number(this.props.settingdatalist[6].datainput) 
                                              - Number(this.props.settingdatalist[7].datainput)
                                            ,  Number(this.props.settingdatalist[4].datainput));
    if (noofcol > maxnumberofcol) {
      noofcol = maxnumberofcol;
    }
    var noofpages = Math.ceil(noofslot / (maxnumberofrow * noofcol));
    this.setState({numberofpages: noofpages});
    setTimeout(() => { 
      var fakearray = createFakeArray(this.state.numberofpages); 
      this.setState({numberofpages_fakearray: fakearray});
    },1);
    console.log(`Window Height ${Dimensions.get('window').height}`);
    console.log(`Header Height ${this.props.settingdatalist[6].datainput}`);
    console.log(`Footer Height ${this.props.settingdatalist[7].datainput}`);
    console.log(`Item Height ${this.props.settingdatalist[4].datainput}`);
    console.log(`Maxnumber of Row ${maxnumberofrow}`);
    return {noofpages: noofpages, maxnumberofrow: maxnumberofrow}
  }

  renderBeverageData(noofcol, noofslot, data, pagenumber){
    var returnedLayout = this.initializeLayout(noofcol, noofslot);
    var numberofpages = returnedLayout.noofpages;
    var noofrow = returnedLayout.maxnumberofrow;
    var processedData = processFullData(noofcol, noofslot, data, pagenumber, numberofpages, noofrow);
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


  onOneItemTouchedOld(itemInfoObject) {
    this.setState({pickedItem: itemInfoObject});

    if(this.state.cashavailable == 0){
      this.setState({isVisible: true});
    }

    else if(this.state.cashavailable > 0 && this.state.cashavailable < itemInfoObject.price){
      Alert.alert("Thông báo", `Ví của bạn đang có ${this.state.cashavailable} vnđ. Cần nạp thêm tiền để mua được 1 sản phẩm ${itemInfoObject.name}`);
    }

    else {
      setTimeout(()=>{ this.processTransaction(true, true, this.state.cashavailable)}, 0);
    }
    clearInterval(this.slidinginterval);
  }

  mySendingSerial(data) {
    console.log(data);
  }
  //#endregion

  //#region - Component

  componentDidMount() {
    this.startUsbListener();
    this.renderBeverageData(this.props.settingdatalist[1].datainput, this.props.settingdatalist[0].datainput, this.props.initialbeveragestate, 1, this.state.numberofpages);
    this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));
  }

  componentWillUnmount(){
    clearInterval(this.slidinginterval);
    this.stopUsbListener();
  }

  //#endregion 

  //#region - Main View

  render() {
    return (
      <View style={{ display: "flex", flex: 1 }}>
        <Modal transparent={true} isVisible={this.state.isVisible}>
          <View style={{display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
            {
              this.state.isProcessing 
              ?
              (this.state.isNotif 
                ? 
                (<Notification buttonArray={this.state.notifButton} title={this.state.notifTitle} description={this.state.notifDescription}  panelWidth={Number(this.props.settingdatalist[10].datainput)} panelHeight={Number(this.props.settingdatalist[11].datainput)} notifFontSize={Number(this.props.settingdatalist[12].datainput)} />)
                : 
                (<ActivityIndicator size="large"/>)
              )
              :
              <PaymentMethodPicker panelWidth={Number(this.props.settingdatalist[10].datainput)} panelHeight={Number(this.props.settingdatalist[11].datainput)} panelFontSize={Number(this.props.settingdatalist[12].datainput)} onTransactionRequired={(transactionApproved, isCash)=>{this.processTransaction(transactionApproved, isCash)}}/>
            }
          </View>
        </Modal>
        
        <View style={{ height: Number(this.props.settingdatalist[6].datainput), alignItems: "center", justifyContent: "flex-start", paddingLeft: 20, flexDirection: "row" }}>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: Number(this.props.settingdatalist[8].datainput), color: "#3e81f4" }}>WELCOME TO ICOCO!</Text>
            </View>
            <View style={{flex: 1, display: "flex", alignItems: "flex-end", paddingRight: 30}}>
                <Text style={{ fontWeight: "bold", fontSize: Number(this.props.settingdatalist[8].datainput), color: "green" }}>
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
                    height={Number(this.props.settingdatalist[4].datainput)}
                    width={Number(this.props.settingdatalist[3].datainput)}
                    itemFontSize={Number(this.props.settingdatalist[5].datainput)}
                  />
                )
              })
            }
          </View>

        </View>
        <View style={{ height: Number(this.props.settingdatalist[7].datainput), width: "100%", backgroundColor: "lightblue", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row" }}>
          <View style={{ minWidth: 150, height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => {processSerialDataToFirmware("hii","test",{value: "kaka"}, this.mySendingSerial);}}>
              <Icon
                size={2.5* Number(this.props.settingdatalist[9].datainput)}
                name="md-help-circle"
                color="#3e81f4"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { this.props.navigation.navigate('LoginPage') }}>
              <Icon
                size={2.5* Number(this.props.settingdatalist[9].datainput)}
                name="md-settings"
                color="#3e81f4"
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
            <View style={{ height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row" }}>
              {
                /*
                <Button
                title="   TEST   "
                onPress= {()=>{this.testFunction();}}
                />
                */
              }
              
              <View style={{ width: 45, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={()=>{this.navigateBetweenPages(this.state.currentpagenumber,false, this.state.numberofpages);this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));}}>
                  <Icon
                    size={2.5* Number(this.props.settingdatalist[9].datainput)}
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
                        <PageButtonItem pagenumber={pageArray.id} pageNumberFontSize={Number(this.props.settingdatalist[9].datainput)+2}/>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>

              <View style={{ width: 45, height: "100%", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={()=>{this.navigateBetweenPages(this.state.currentpagenumber,true, this.state.numberofpages);this.processSlidingInterval(Number(this.props.settingdatalist[2].datainput));}}>
                  <Icon
                    size={2.5* Number(this.props.settingdatalist[9].datainput)}
                    name="ios-arrow-forward"
                    color="#3e81f4"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ minWidth: 150, height: "100%", backgroundColor: "lightblue", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
              {isNotZero(this.state.cashavailable) && (<TouchableOpacity style={{backgroundColor:"dodgerblue", borderRadius: 5, padding:7, paddingVertical:10,justifyContent:"center"}} onPress={()=>{this.onCancelTransaction()}}><Text style={{fontSize: Number(this.props.settingdatalist[9].datainput),color:"white"}}>HỦY GIAO DỊCH</Text></TouchableOpacity>)}
          </View>
        </View>
      </View>
    );
  }

  //#endregion

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