import React, { Component } from 'react';
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
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { RNSerialport, definitions, actions } from 'react-native-serialport';
import Modal from 'react-native-modal';

class ProcessCashTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isCash: true,
            transactionstarted: true,
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
        this.itemname = this.props.navigation.state.params.itemname;
        this.itemprice = this.props.navigation.state.params.itemprice;
        this.itemid = this.props.navigation.state.params.itemid;
        this.cashavailable = this.props.navigation.state.params.cashavailable;
        this.processCashChange(this.cashavailable, this.itemprice);
    }

    getItemFromVMWithCash(slotsetting, itemname){
        this.setState({isVisible: true});
        var getString = JSON.stringify({topic:"buywithcash", type: "request", content: {slotsetting: slotsetting, name: itemname}});
        if(this.state.connected){
            this.sendSerialData(getString);
            return;
        }
        setTimeout(()=>{
            this.onGetItemResultFromVMWithCash(true, 'none', 'none', 'Timeout but no response');
        },5000)
    }

    onGetItemResultFromVMWithCash(isSuccess, slotsetting, itemname, errorIfExists){
        this.setState({isVisible: false});
        if(isSuccess){
            Alert.alert("Thông báo", "Mời Quý Khách nhận nước. Chúc Quý Khách ngon miệng!");
            this.goBackHome("SUCCESS");
        }
        else{
            Alert.alert("Thông báo", "Máy gặp sự cố kỹ thuật. Mời Quý Khách thử lại lần nữa!");
            this.showError(errorIfExists);
            this.goBackHome("FAILED");
        }
        
    }   

    goBackHome(data){
        this.props.navigation.goBack();
        this.props.navigation.state.params.onReturnHome(data);
    }

    showError(error){
        console.log(error);
    }

    checkRemainderFromVendingMachine(){
        console.log("Tien con lai")
    }

    handleTransactionResult(isSuccessful){
        if(isSuccessful){
            Alert.alert("Thông báo", "Chúc bạn ngon miệng");
        }
        else {
            Alert.alert("Thông báo", "Lỗi máy! Mời quý khách thực hiện lại giao dịch");   
        }
        this.checkRemainderFromVendingMachine()
        this.props.navigation.navigate('Home');
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
            var inputObject = JSON.parse(payload);
            var topic = inputObject.topic || 'none';
            var type = inputObject.type || 'none';
            var content = inputObject.content || 'none';
            if (topic == 'none' || content == 'none') {
                console.log("Firmware requests unrecognized!");
            }
            else {
                switch (topic) {
                    case 'buywithcash':
                        if (type != 'response') {
                            this.showError('Firmware should send a request with type of response');
                            return;
                        }
                        else {
                            var isSuccess = (content.status == 'ok' ? true : false);
                            var errorIfExists = content.error || 'none';
                            this.onGetItemResultFromVMWithCash(isSuccess, content.slotsetting, content.name, errorIfExists);
                        }
                        break;


                    default:
                        break;
                }
            }
        }
    }

    sendSerialData(string) {
        RNSerialport.writeString(string);
    }

    onFirmwareAccept() {

    }

    sendTransactionToFirmware() {
        console.log("sent transaction to firmware");
    }

    processCashChange(cashavailable, itemprice) {
        var cashChange = cashavailable % itemprice;
        if (cashChange == 0 || (cashChange % 10000) == 0) {
            this.getItemFromVMWithCash(thí.slotsetting, this.itemname);
        }
        else if ((cashChange % 10000) != 0) {
            Alert.alert(
                "Chú Ý",
                "Máy không thối được tiền lẻ có mệnh giá dưới 10000 vnđ. Bạn có muốn tiếp tục mua",
                [
                    { text: "Tiếp Tục", onPress: () => { this.getItemFromVMWithCash(this.slotsetting, this.itemname)}},
                    { text: "Hủy Giao Dịch", onPress: () => { this.goBackHome("none") } }
                ]
            )
        }
    }

    render() {
        return (
            <View style={{ display: "flex", flex: 1 }}>
                <Modal transparent={true} isVisible={this.state.isVisible}>
                    <View style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" />
                    </View>
                </Modal>
                <View style={{ display: "flex", flex: 1, padding: 5, flexDirection: "row" }}>

                    <View style={{ displat: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 20 }}>
                            Mời Quý Khách Chờ Một Lát Để Mua Được 1 {this.itemname}
                        </Text>
                    </View>
                </View>

                <View style={{ height: 50, width: "100%", backgroundColor: "lightblue", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 150, height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
                        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { }}>
                            <Icon
                                size={40}
                                name="md-help-circle"
                                color="#3e81f4"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>

                    </View>

                    <View style={{ width: 150, height: "100%", backgroundColor: "lightblue", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
                        <Button title="Hủy Giao Dịch" onPress={()=>{this.goBackHome('SUCCESS')}}/>
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount() {
        
    }

    componentWillUnmount(){
        
    }
};


function mapStateToProps(state) {
    return {
        settingdatalist: state.settingdatalist,

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCashTransaction);