//#region IMPORt
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Alert,
  DeviceEventEmitter,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {
  sendUserFeedbackAboutDisabilityOfGivingBackCashChange,
  sendContinueOrCancelTransaction,
} from '../business/AppToFirmwareFunctions';
import {
  onReceivedUiRequirement,
  onGivingBackInputDisabilityDisplayRequirement,
  onUpdateCashAvailable,
} from '../business/FirmwareToAppFunctions';
import Notification from './Notifications';
import {sendUartData} from '../redux/actions/';
//#endregion

class ProcessCashTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashavailable: this.props.navigation.state.params.cashavailable,
      isVisible: false,
      isNotif: false,
      notifButton: [],
      isCash: true,
      transactionstarted: true,
      refreshTime: 1
    };
    this.itemname = this.props.navigation.state.params.itemname;
    this.cashavailable = this.props.navigation.state.params.cashavailable;
    this.isDirectCashTransaction = this.props.navigation.state.params.isDirect;
    this.sendSerialData = this.sendSerialData.bind(this);
    this.showUiGivingBackInputDisability = this.showUiGivingBackInputDisability.bind(
      this,
    );
    this.pickUi = this.pickUi.bind(this);
    this.updateCashAvailable = this.updateCashAvailable.bind(this);
    this.imageSource = this.props.navigation.state.params.itemimage;
  }

  //#region - Testing Purposes
  testFunction() {
    //this.sendSerialData(JSON.stringify({topic:"cashMethod", type:"response", content: {status: "ok"}}));
    this.sendSerialData(
      JSON.stringify({
        topic: 'cashMethod',
        type: 'response',
        content: {status: 'ok'},
      }),
      true,
    );
    onUpdateCashAvailable('refreshCash', 230000, this.updateCashAvailable);
  }
  //#endregion

  //#region - Showing Specific Ui for different purposes
  pickUi(uiId, uiDescription, params) {
    this.hideLoadingUi();
    switch (uiId) {
      case 1:
        this.showUiPleaseGetProduct(uiDescription, params);
        setTimeout(() => {
          this.goBackHome('none');
        }, 4000);
        break;
      case 9:
        this.goBackHome('none');
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
      case 15:
        this.showUiPleaseGetCash(uiDescription, params);
        break;
      default:
        break;
    }
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

  showLoadingUi() {
    this.setState({isVisible: true, isNotif: false});
  }

  hideLoadingUi() {
    this.setState({isVisible: false});
  }

  showUiPleaseGetCash(a, b) {
    this.showUiNotification('Thông báo', 'Mời bạn nhận lại tiền');
  }

  showUiMoreThan50000(a, b) {
    this.showUiNotification(
      'Thông báo',
      'Tổng tiền lớn hơn 50000 vnđ rồi... Mời bạn nhận lại tiền!',
    );
  }

  showUiNotEnoughToGiveBack(a, b) {
    this.showUiNotification(
      'Thông báo',
      'Máy không đủ tiền thối rồi... Mời bạn nhận lại tiền!',
    );
  }

  showUiGivingBackInputDisability() {
    this.showUiNotification(
      'Thông báo',
      'Xin lỗi, không thể thối tiền vừa đưa vào. Quý khách có muốn mua mà không cần thối tiền lẻ',
      [
        {
          text: 'Không cần thối',
          onPress: () => {
            this.feedbackAboutDisabledGivingBackCash(true);
          },
        },
        {
          text: 'Hủy giao dịch',
          onPress: () => {
            this.feedbackAboutDisabledGivingBackCash(false);
          },
        },
      ],
      {cancelable: false},
    );
  }

  showUiContinueOrCancel() {
    this.showUiNotification(
      'Thông báo',
      'Có muốn tiếp tục không',
      [
        {
          text: 'Tiếp tục',
          onPress: () => {
            sendContinueOrCancelTransaction(0, this.sendSerialData);
          },
        },
        {
          text: 'Hủy',
          onPress: () => {
            sendContinueOrCancelTransaction(1, this.sendSerialData);
          },
        },
      ],
      {cancelable: false},
    );
  }

  showUiCannotGiveCashRemain(a, b) {
    this.showUiNotification(
      'Thông báo',
      'Không thể thối tiền thừa cho Quý Khách!',
      [
        {
          text: 'Không cần thối tiền lẻ',
          onPress: () => {
            this.feedbackAboutDisabledGivingBackCash(true);
          },
        },
        {
          text: 'Hủy giao dịch',
          onPress: () => {
            this.feedbackAboutDisabledGivingBackCash(false);
          },
        },
      ],
    );
  }

  showUiPleaseGetProduct(a, b) {
    this.showUiNotification(
      'Thông báo',
      'Mời Quý Khách nhận sản phẩm ở bên dưới!',
    );
  }

  //#endregion

  //#region - Categorized Code
  feedbackAboutDisabledGivingBackCash(userAccept) {
    sendUserFeedbackAboutDisabilityOfGivingBackCashChange(
      userAccept,
      this.sendSerialData,
    );
  }

  updateCashAvailable(inputCashOrRefreshCash, cashValue) {
    this.showLoadingUi();
    if (inputCashOrRefreshCash == 'inputCash') {
      this.setState({cashavailable: this.state.cashavailable + cashValue});
    } else if (inputCashOrRefreshCash == 'refreshCash') {
      this.setState({cashavailable: cashValue});
    }
    this.hideLoadingUi();
  }
  //#endregion

  //#region - Uncategorized Code
  getItemFromVMWithCash(slotsetting, itemname) {
    this.setState({isVisible: true});
    var getString = JSON.stringify({
      topic: 'buywithcash',
      type: 'request',
      content: {slotsetting: slotsetting, name: itemname},
    });
    if (this.state.connected) {
      this.sendSerialData(getString);
      return;
    }
    setTimeout(() => {
      this.onGetItemResultFromVMWithCash(
        true,
        'none',
        'none',
        'Timeout but no response',
      );
    }, 5000);
  }

  onGetItemResultFromVMWithCash(
    isSuccess,
    slotsetting,
    itemname,
    errorIfExists,
  ) {
    this.setState({isVisible: false});
    if (isSuccess) {
      Alert.alert(
        'Thông báo',
        'Mời Quý Khách nhận nước. Chúc Quý Khách ngon miệng!',
      );
      this.goBackHome('SUCCESS');
    } else {
      Alert.alert(
        'Thông báo',
        'Máy gặp sự cố kỹ thuật. Mời Quý Khách thử lại lần nữa!',
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

  checkRemainderFromVendingMachine() {
    console.log('Tien con lai');
  }

  handleTransactionResult(isSuccessful) {
    if (isSuccessful) {
      Alert.alert('Thông báo', 'Chúc bạn ngon miệng');
    } else {
      Alert.alert(
        'Thông báo',
        'Lỗi máy! Mời quý khách thực hiện lại giao dịch',
      );
    }
    this.checkRemainderFromVendingMachine();
    this.props.navigation.navigate('Home');
  }

  processCashChange(cashavailable, itemprice) {
    var cashChange = cashavailable % itemprice;
    if (cashChange == 0 || cashChange % 10000 == 0) {
      this.getItemFromVMWithCash(thí.slotsetting, this.itemname);
    } else if (cashChange % 10000 != 0) {
      Alert.alert(
        'Chú Ý',
        'Máy không thối được tiền lẻ có mệnh giá dưới 10000 vnđ. Bạn có muốn tiếp tục mua',
        [
          {
            text: 'Tiếp Tục',
            onPress: () => {
              this.getItemFromVMWithCash(this.slotsetting, this.itemname);
            },
          },
          {
            text: 'Hủy Giao Dịch',
            onPress: () => {
              this.goBackHome('none');
            },
          },
        ],
      );
    }
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
    console.log("sent");
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

  processUartData(inputObject){
      var topic = inputObject.topic || 'none';
      var type = inputObject.type || 'none';
      var content = inputObject.content || 'none';
      if (topic == 'none' || content == 'none') {
        console.log('Firmware requests unrecognized!');
        return;
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

          case 'cashMethod':
            if (type == 'updateMoney') {
              this.sendSerialData(
                JSON.stringify({
                  topic: 'cashMethod',
                  type: 'response',
                  content: {status: 'ok'},
                }),
                true,
              );
              onUpdateCashAvailable(
                'refreshCash',
                content.value,
                this.updateCashAvailable,
              );
            } else if (type == 'request') {
              this.sendSerialData(
                JSON.stringify({
                  topic: 'cashMethod',
                  type: 'response',
                  content: {status: 'ok'},
                }),
                true,
              );
              onGivingBackInputDisabilityDisplayRequirement(
                this.showUiGivingBackInputDisability,
              );
            }
            break;
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
            height: Number(this.props.settingdatalist[6].datainput),
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 20,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              paddingRight: 30,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: Number(this.props.settingdatalist[8].datainput),
                color: 'green',
              }}>
              ĐÃ NẠP: {this.state.cashavailable} VNĐ
            </Text>
          </View>
        </View>
        <View
          style={{display: 'flex', flex: 1, padding: 5, flexDirection: 'row'}}>
          <View
            style={{
              displat: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize:
                    1.3 * Number(this.props.settingdatalist[12].datainput),
                  paddingTop: 20,
                  fontWeight: 'bold',
                  color: 'dodgerblue',
                }}>
                THÔNG TIN GIAO DỊCH SẢN PHẨM
              </Text>
            </View>
            <View
              style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  paddingVertical:
                    Number(this.props.settingdatalist[6].datainput) / 2,
                }}>
                <Text
                  style={{
                    fontSize:
                      1.2 * Number(this.props.settingdatalist[12].datainput),
                  }}>
                  Sản phẩm: {this.itemname}
                </Text>
                <Text
                  style={{
                    fontSize:
                      1.2 * Number(this.props.settingdatalist[12].datainput),
                  }}>
                  Số lượng: 1
                </Text>
              </View>
              <View>
                <Image
                  style={{
                    height: Number(this.props.settingdatalist[7].datainput) * 2,
                    width: Number(this.props.settingdatalist[7].datainput) * 2,
                  }}
                  source={{uri: `${this.imageSource}`}}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: Number(this.props.settingdatalist[7].datainput),
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
            <TouchableOpacity style={{marginRight: 15}} onPress={() => {}}>
              <Icon size={40} name="md-help-circle" color="#3e81f4" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                sendContinueOrCancelTransaction(0, this.sendSerialData);
              }}
              style={{
                backgroundColor: 'dodgerblue',
                borderRadius: 5,
                padding: 7,
                paddingVertical: 10,
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: Number(this.props.settingdatalist[9].datainput),
                  color: 'white',
                }}>
                TIẾP TỤC
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                sendContinueOrCancelTransaction(1, this.sendSerialData);
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
            {/* <Button title="Test" onPress={() => { this.testFunction() }} /> */}
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

    else if (
      JSON.stringify(this.props.uartSend) !== JSON.stringify(prevProps.uartSend)) {
      Alert.alert("Sent", JSON.stringify(this.props.uartSend));
    }
  }
}

function mapStateToProps(state) {
  return {
    uartSend: state.uart.send,
    uartReceive: state.uart.receive,
    settingdatalist: state.settingpage1reducer.settingdatalist,
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
)(ProcessCashTransaction);
