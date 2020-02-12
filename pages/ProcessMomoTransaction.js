import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  ActivityIndicator,
  Alert,
  
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Modal from 'react-native-modal';

const mybase64 =
  'data:image/png;base64,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';
import {
  onReceivedQrCode,
  onReceivedUiRequirement,
  onMomoTransactionResult,
  onMomoTransactionTimeout,
} from '../business/FirmwareToAppFunctions';

import {sendContinueOrCancelTransaction} from '../business/AppToFirmwareFunctions';

import Notification from './Notifications';
import {sendUartData} from '../redux/actions/';

class ProcessMomoTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondCount: 30,
      base64QrImage: 'data:image/png;base64',
      isVisible: false,
      isNotif: false,
      notifButton: [],
      isCash: true,
      transactionstarted: true,
      readyForMomo: false,
      refreshTime: 1,
    };
    this.itemname = this.props.navigation.state.params.itemname;
    this.cashavailable = this.props.navigation.state.params.cashavailable;
    this.sendSerialData = this.sendSerialData.bind(this);
    this.showQr = this.showQr.bind(this);
    this.pickUi = this.pickUi.bind(this);
    this.processMomoTransactionResult = this.processMomoTransactionResult.bind(
      this,
    );
    this.processMomoTransactionTimeout = this.processMomoTransactionTimeout.bind(
      this,
    );
    this.qrscanningtimeout;
    this.countingInterval;
  }

  //#region - Testing Purposes
  testFunction() {
    // this.sendSerialData(
    //   JSON.stringify({
    //     topic: 'momoMethod',
    //     type: 'response',
    //     content: {status: 'ok'},
    //   }),
    //   true,
    // );
    // onReceivedQrCode(mybase64, this.showQr);
    // this.startQrScanningTimeout(30000);
    this.processUartData({"topic":"interface","type":"request","content":{"value":9}});
  }

  //#endregion

  //#region - Showing Specific Ui for different purposes

  pickUi(uiId, uiDescription, params) {
    
    switch (uiId) {
      case 1:
        this.showUiPleaseGetProduct(uiDescription, params);
        setTimeout(() => {
          this.goBackHome('none');
        }, 4000);
        break;
      case 2:
        this.showUiPleaseWaitForQr(uiDescription, params);
        break;
      case 3:
        this.showUiPleaseScanQr(uiDescription, params);
        break;
      case 5:
        this.showUiMomoTransactionStatus(1, false);
        setTimeout(() => {
          this.goBackHome('none');
        }, 4000);
        break;
      case 6:
        this.showUiMomoTransactionStatus(1, true);
        break;
      case 7:
        this.showUiMomoLostConnection(uiDescription, params);
        break;
      case 9:
        this.goBackHome('none');
        break;
      default:
        break;
    }
  }

  showLoadingUi() {
    this.setState({isVisible: true, isNotif: false});
  }

  hideLoadingUi() {
    this.setState({isVisible: false, isNotif: false});
  }

  showUiNotification(title, description, buttonOptions) {
    if (buttonOptions == null) {
      buttonOptions = [];
    }
    this.setState({
      notifTitle: title,
      notifDescription: description,
      notifButton: buttonOptions,
      isVisible: true,
      isNotif: true,
    });
  }

  hideUiNotification() {
    this.setState({isVisible: false});
  }

  showQr(base64String) {
    this.setState({base64QrImage: base64String});
  }

  showUiPleaseWaitForQr(a, b) {
    this.showUiNotification('Thông báo', 'Xin chờ một tí để hiện QR');
  }

  showUiPleaseScanQr(a, b) {
    this.showUiNotification('Thông báo', 'Xin mời Quý Khách quét QR');
  }

  showUiMomoTransactionStatus(a, isSuccessful) {
    clearInterval(this.countingInterval);
    clearTimeout(this.qrscanningtimeout);
    var infoHere =
      'Giao dịch Momo' + (isSuccessful ? ' thành công!' : ' thất bại!');
    this.showUiNotification('Thông báo', infoHere);
  }

  showUiMomoLostConnection(a, b) {
    this.showUiNotification(
      'Thông báo',
      'Mất mạng Internet. Không thể thực hiện giao dịch Momo lúc này!',
    );
  }

  showUiPleaseGetProduct(a, b) {
    this.showUiNotification(
      'Thông báo',
      'Mời Quý Khách nhận sản phẩm ở bên dưới!',
    );
  }

  showUiMomoTransactionTimeout(a, b) {
    this.showUiNotification(
      'Thông báo',
      'Xin lỗi! Đã quá thời gian quét Momo...Mời bạn thử lại!',
    );
  }
  //#endregion

  //#region - Categorized Code
  processMomoTransactionResult(isSuccessful) {
    if (!isSuccessful) {
      this.goBackHome('NONE');
    }
  }

  processMomoTransactionTimeout() {
    this.goBackHome('MOMO TIMEOUT');
  }

  //#endregion

  //#region - Uncategorized Code

  getItemFromVMWithMomo(slotsetting, itemname) {
    this.setState({isVisible: true});
    var getstring = JSON.stringify({
      topic: 'buywithmomo',
      type: 'request',
      content: {slotsetting: slotsetting, name: itemname},
    });
    if (this.state.connected) {
      this.sendSerialData(getstring);
      return;
    }
    setTimeout(() => {
      this.onGetItemResultFromVMWithMomo(false, 'none', 'none', 'none', 'none');
    }, 5000);

    setTimeout(() => {
      this.onMomoSignalResult(true);
    }, 15000);
  }

  onGetItemResultFromVMWithMomo(
    isSuccess,
    slotsetting,
    itemname,
    base64IfOk,
    errorIfExists,
  ) {
    this.setState({isVisible: false});
    if (isSuccess) {
      this.setState({qrCodeImage: mybase64});
      this.startQrScanningTimeout(40000);
    } else {
      this.showError(errorIfExists);
      Alert.alert(
        'Thông báo',
        'Máy gặp sự cố kỹ thuật. Mời Quý Khách thử lại lần nữa!',
        [
          {
            text: 'Đã hiểu',
            onPress: () => {
              this.goBackHome('FAILED');
            },
          },
        ],
      );
    }
  }

  onMomoSignalResult(isSuccess) {
    var feedbackString = JSON.stringify({
      topic: 'momosignal',
      type: 'response',
      content: {status: 'ok'},
    });
    clearInterval(this.countingInterval);
    clearTimeout(this.qrscanningtimeout);

    if (this.state.connected) {
      this.sendSerialData(feedbackString);
    }
    if (isSuccess) {
      Alert.alert(
        'Thông báo',
        'Mời Quý Khách nhận nước. Chúc Quý Khách ngon miệng!',
      );
      this.goBackHome('SUCCESS');
    } else {
      Alert.alert(
        'Thông báo',
        'Máy gặp sự cố kỹ thuật. Tiền sẽ được trả về ví Momo của bạn trong vòng 24h!',
      );
      this.showError(errorIfExists);
      this.goBackHome('FAILED');
    }
  }

  goBackHome(data) {
    this.props.navigation.goBack();
    this.props.navigation.state.params.onReturnHome(data);
  }

  showError(error) {
    console.log(error);
  }

  onUnableToProcessTransaction() {
    Alert.alert('Xin Lỗi', 'Không thể thực hiện thanh toán Momo lúc này!', [
      {
        text: 'OK',
        onPress: () => {
          this.goBackHome('FAILED');
        },
      },
    ]);
  }

  onAppTimeoutTransaction() {
    this.showUiNotification(
      'Thông báo',
      'Xin lỗi! Đã quá thời gian quét Momo...Mời bạn thử lại!',
    );
    sendContinueOrCancelTransaction(0, this.sendSerialData);
  }

  onCancelTransaction() {
    sendContinueOrCancelTransaction(0, this.sendSerialData);
  }

  startQrScanningTimeout(millis) {
    var waitin = millis;
    if (waitin < 75000) waitin = 25000;
    this.countSeconds(waitin);
    this.qrscanningtimeout = setTimeout(() => {
      this.onAppTimeoutTransaction();
    }, waitin);
  }

  countSeconds(millis) {
    this.setState({secondCount: millis / 1000});
    this.countingInterval = setInterval(() => {
      if (this.state.secondCount == 0) {
        clearInterval(this.countingInterval);
        return;
      }
      this.setState({secondCount: this.state.secondCount - 1});
    }, 1000);
  }

  onFirmwareFailed() {}

  onFirmwareReceiveQrCode(data) {
    this.setState({readyForMomo: true});
  }

  sendTransactionToFirmware() {
    console.log('sent transaction to firmware');
  }

  //#endregion

  //#region - Usb Serial Interface
  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  sendSerialData(string, notStrict) {
    if (!this.isJson(string)) return;
    var sendObject = JSON.parse(string);
    if (typeof sendObject !== 'object') return;

    if (string === JSON.stringify(this.props.uartSend)) {
      sendObject.refresh = this.state.refreshTime;
      this.props.sendUartData(sendObject, notStrict);
      this.setState({refreshTime: this.state.refreshTime + 1});
      return;
    }

    this.props.sendUartData(sendObject, notStrict);
    this.setState({refreshTime: 1});
  }

  processUartData(inputObject) {
    var topic = inputObject.topic || 'none';
    var type = inputObject.type || 'none';
    var content = inputObject.content || 'none';
    if (topic == 'none' || content == 'none') {
      console.log('Firmware requests unrecognized!');
    } else {
      switch (topic) {
        case 'interface':
          if (type == 'request') {
            this.sendSerialData(
              JSON.stringify({
                topic: 'interface',
                type: 'response',
                content: {status: 'ok'},
              }),
              true,
            );
            onReceivedUiRequirement(content.value, 'none', this.pickUi);
          }
          break;

        case 'momoMethod':
          if (type == 'update') {
            this.sendSerialData(
              JSON.stringify({
                topic: 'momoMethod',
                type: 'response',
                content: {status: 'ok'},
              }),
              true,
            );
            onReceivedQrCode(content.base64, this.showQr);
            this.hideLoadingUi();
            this.startQrScanningTimeout(30000);
            break;
          } else if (type == 'timeout') {
            onMomoTransactionTimeout(this.showUiMomoTransactionTimeout);
          }

        default:
          break;
      }
    }
  }

  //#endregion

  //#region - Main View
  render() {
    return (
      <View style={{display: 'flex', flex: 1}}>
        <Modal transparent={true} isVisible={this.state.isVisible}>
          <View
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {this.state.isNotif ? (
              <Notification
                buttonArray={this.state.notifButton}
                title={this.state.notifTitle}
                description={this.state.notifDescription}
                panelWidth={Number(this.props.settingdatalist[10].datainput)}
                panelHeight={Number(this.props.settingdatalist[11].datainput)}
                notifFontSize={Number(this.props.settingdatalist[12].datainput)}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
          </View>
        </Modal>
        <View
          style={{
            display: 'flex',
            flex: 1,
            padding: 5,
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: 70,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize:
                  1.2 * Number(this.props.settingdatalist[12].datainput),
              }}>
              Mời Quý Khách Chờ Quét QR Để Trả Tiền Cho 1 {this.itemname}
            </Text>
            <Text
              style={{
                fontSize:
                  1.2 * Number(this.props.settingdatalist[12].datainput),
              }}>
              Giao dịch sẽ hết hạn trong {this.state.secondCount}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 170,
                height: 170,
                backgroundColor: 'whitesmoke',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              {!this.state.isVisible ? (
                <Image
                  style={{width: 150, height: 150}}
                  source={{uri: this.state.base64QrImage}}
                />
              ) : null}
            </View>
          </View>
        </View>

        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: 'lightblue',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: 150,
              height: '100%',
              backgroundColor: 'lightblue',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 10,
            }}>
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => {
                this.setState({readyForMomo: !this.state.readyForMomo});
              }}>
              <Icon size={40} name="md-help-circle" color="#3e81f4" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>

          <View
            style={{
              width: 150,
              height: '100%',
              backgroundColor: 'lightblue',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 10,
            }}>
            {/* <Button title="TEST" onPress={() => { this.testFunction() }} /> */}
            <TouchableOpacity
              onPress={() => {
                this.onCancelTransaction();
              }}
              style={{
                backgroundColor: 'dodgerblue',
                borderRadius: 5,
                padding: 7,
                paddingVertical: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: Number(this.props.settingdatalist[9].datainput),
                  color: 'white',
                }}>
                HỦY GIAO DỊCH
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  //#endregion

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.uartReceive) !==
      JSON.stringify(prevProps.uartReceive)
    ) {
      this.processUartData(this.props.uartReceive);
    }
  }

  componentDidMount(){
    // this.testFunction();
  }
}

function mapStateToProps(state) {
  return {
    uartSend: state.uart.send,
    uartReceive: state.uart.receive,
    settingdatalist: state.settingpage1reducer.settingdatalist,
    serialPortSettings: state.settingpage1reducer.serialPortSettings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendUartData: (data, notStrict) => dispatch(sendUartData(data, notStrict)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProcessMomoTransaction);
