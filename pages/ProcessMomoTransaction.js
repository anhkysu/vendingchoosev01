import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image,
    ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

class ProcessMomoTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCash: true,
            transactionstarted: true,
            readyForMomo: false,
        };
        this.pickeditemid = this.props.navigation.state.params.id;
    }

    render() {
        return (
            <View style={{ display: "flex", flex: 1 }}>
                <View style={{ display: "flex", flex: 1, padding: 5, flexDirection: "column" }}>
                    <View style={{ height:70 ,display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 20 }}>
                            Mời Quý Khách Chờ Quét QR Để Trả Tiền Cho 1 {this.pickeditemid}
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