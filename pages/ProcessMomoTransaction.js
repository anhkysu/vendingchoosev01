import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image,
    ActivityIndicator,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { RNSerialport, definitions, actions } from 'react-native-serialport';

class ProcessMomoTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCash: true,
            transactionstarted: true,
            readyForMomo: false,
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
        this.qrscanningtimeout;
    }

    getBeverageItemFromVendingMachine(slotsetting){
        var getstring = JSON.stringify({"label":"buy","type":"momo","itemid":slotsetting});
        this.sendSerialData(getstring);
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
        if (this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY) {
            const payload = RNSerialport.intArrayToUtf16(data.payload);
            this.setState({ output: this.state.output + payload });
        } else if (
            this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING
        ) {
            const payload = RNSerialport.hexToUtf16(data.payload);
            var receivedobject = JSON.parse(payload);
            if(receivedobject.fwstatus != "" && receivedobject.fwstatus != undefined){
                if(receivedobject.fwstatus == "ok") {}
                else if(receivedobject.fwstatus == "error") {}
              }

            else if(receivedobject.label == "momostatus"){
                if(receivedobject.value == "success") {}
                else if(receivedobject.value == "failed") {}
            }
        
            else {
                Alert.alert("Chú ý", "Firmware gửi tín hiệu lạ quá, không phân tích được!");
            }
        }
    }

    sendSerialData(string) {
        RNSerialport.writeString(string);
    }

    onUnableToProcessTransaction(){
        Alert.alert(
            "Xin Lỗi",
            "Không thể thực hiện thanh toán Momo lúc này!",
            [
                {text: "OK", onPress: ()=>{this.props.navigation.navigate('Home')} }
            ]
        )
    }

    onCancelTransaction(){
        Alert.alert(
            "Thông báo", 
            "Đã quá thời gian giao dịch Momo",
            [
                {text: "OK", onPress: ()=>{this.onUnableToProcessTransaction()} }
            ]  
        )
    }

    startQrScanningTimeout(millis){
        var waitin = millis;
        if(waitin < 75000) waitin = 75000;
        this.qrscanningtimeout = setTimeout(()=>{this.onCancelTransaction},waitin)
    }

    onFirmwareSuccess(){

    }

    onFirmwareFailed(){
        Alert.alert(
            "Xin Lỗi",
            "Máy bán hàng bị lỗi. Tiền sẽ được trả về ví Momo của bạn trong vòng 24h",
            [
                {text: "Đã hiểu", onPress: ()=>{this.props.navigation.navigate('Home')} }
            ]
        )
    }

    onFirmwareReceiveQrCode(data){
        this.setState({readyForMomo:true});
    }

    sendTransactionToFirmware(){
        console.log("sent transaction to firmware");
    }

    render() {
        return (
            <View style={{ display: "flex", flex: 1 }}>
                <View style={{ display: "flex", flex: 1, padding: 5, flexDirection: "column" }}>
                    <View style={{ height:70 ,display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 20 }}>
                            Mời Quý Khách Chờ Quét QR Để Trả Tiền Cho 1 {this.itemname}
                        </Text>
                    </View>
                    <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <View style={{width: 170, height: 170, backgroundColor: "whitesmoke", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 5}}>
                            {
                                (this.state.readyForMomo ? <Image style={{width:150, height:150}} source={require("./testqr.png")}/> : <ActivityIndicator size="large"/>)
                            }
                        </View>
                    </View>
                </View>

                <View style={{ height: 50, width: "100%", backgroundColor: "lightblue", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 150, height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
                        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { this.setState({readyForMomo: !this.state.readyForMomo})}}>
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
                        <Button title="Hủy Giao Dịch" onPress={()=>{}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProcessMomoTransaction);