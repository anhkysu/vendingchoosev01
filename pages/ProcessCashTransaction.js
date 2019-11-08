import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image
} from 'react-native';
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";


class ProcessCashTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCash: true,
            transactionstarted: true,
        };
        this.pickeditemid = this.props.navigation.state.params.id;
    }

    render() {
        return (
            <View style={{ display: "flex", flex: 1 }}>
                <View style={{ display: "flex", flex: 1, padding: 5, flexDirection: "row" }}>
                        
                            <View style={{ displat: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 20 }}>
                                    Mời Quý Khách Bỏ Tiền Vào Máy Để Trả Tiền Cho 1 {this.pickeditemid}
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
                        <Button title="Hủy Giao Dịch" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProcessCashTransaction);