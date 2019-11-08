import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Button,
    Image
} from 'react-native';
import { connect } from "react-redux";
import { CheckBox } from 'react-native-elements'

class PaymentMethodPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCash: true,
            transactionstarted: false,
        };
    }

    render() {
        return (
            <View style={{ width: "70%", height: "100%", backgroundColor: "white", borderRadius: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, paddingTop: 20, paddingLeft: 20 }}>
                    Vui lòng chọn phương thức thanh toán
                </Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 250 }}>
                        <CheckBox
                            left
                            containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                            title='Tiền Mặt'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.isCash}
                            onPress={() => this.setState({ isCash: !this.state.isCash })}
                            textStyle={{ fontSize: 18 }}
                        />
                        <CheckBox
                            left
                            containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                            title='Ví MoMo'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={!this.state.isCash}
                            onPress={() => this.setState({ isCash: !this.state.isCash })}
                            textStyle={{ fontSize: 18}}
                        />
                    </View>
                    <View style={{ flex: 1, display: "flex", justifyContent: "flex-start", alignItems: "center", paddingTop: 20, paddingRight: 40 }}>
                        {
                            this.state.isCash
                                ? <Image style={{ width: 70, height: 70 }} source={require('./cash.png')} />
                                : <Image style={{ width: 70, height: 70 }} source={require('./momo.png')} />
                        }
                    </View>
                </View>
                <View style={{ padding: 15, display: "flex", alignItems: "center" }}>
                    <View style={{paddingVertical:5, width: 250}}>
                        <Button title="Thanh toán" style={{marginVertical: 5}} onPress={()=>{this.props.onTransactionRequired(true,this.state.isCash)}} />
                    </View>
                    <View style={{paddingVertical:5, width: 250}}>
                        <Button title="Hủy Mua" style={{marginVertical: 5}} onPress={()=>{this.props.onTransactionRequired(false,this.state.isCash)}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodPicker);