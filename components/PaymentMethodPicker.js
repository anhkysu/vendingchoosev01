import React, { Component } from 'react';
import {
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
            <View style={{ width: this.props.panelWidth, minHeight: this.props.panelHeight, backgroundColor: "white", borderRadius: 10, paddingHorizontal: 20}}>
                <Text style={{ fontSize: this.props.panelFontSize, fontWeight: 'bold', marginBottom: 20, paddingTop: 20, paddingLeft: 20 }}>
                    Vui lòng chọn phương thức thanh toán
                </Text>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <View style={{ minWidth: 300, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <View style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent:"flex-end" }}>
                            <CheckBox
                                left
                                containerStyle={{ backgroundColor: "transparent", borderWidth: 0, paddingTop: 15 }}
                                title='TIỀN MẶT'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.isCash}
                                onPress={() => this.setState({ isCash: !this.state.isCash })}
                                textStyle={{ fontSize: this.props.panelFontSize }}
                                
                            />
                            <CheckBox
                                left
                                containerStyle={{ backgroundColor: "transparent", borderWidth: 0, paddingTop:15 }}
                                title='VÍ MOMO'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={!this.state.isCash}
                                onPress={() => this.setState({ isCash: !this.state.isCash })}
                                textStyle={{ fontSize: this.props.panelFontSize }}
                                
                            />
                        </View>
                        <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 20, }}>
                            {
                                this.state.isCash
                                    ? <Image style={{ width: 5*this.props.panelFontSize, height: 5*this.props.panelFontSize }} source={require('./cash.png')} />
                                    : <Image style={{ width: 5*this.props.panelFontSize, height: 5*this.props.panelFontSize }} source={require('./momo.png')} />
                            }
                        </View>
                    </View>
                </View>
                <View style={{ padding: 15, display: "flex", alignItems: "center" }}>
                    <View style={{paddingVertical:5, width: 250}}>
                        <TouchableOpacity onPress={()=>{this.props.onTransactionRequired(true,this.state.isCash)}} style={{backgroundColor: "dodgerblue", borderRadius: 5, padding:5, paddingVertical:6, display: "flex", alignItems: "center"}}>
                            <Text style={{fontSize:this.props.panelFontSize, color:"white"}}>THANH TOÁN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingVertical:5, width: 250}}>
                        <TouchableOpacity onPress={()=>{this.props.onTransactionRequired(false,this.state.isCash)}} style={{backgroundColor: "dodgerblue", borderRadius: 5, padding: 5, paddingVertical:6, display: "flex", alignItems: "center"}}>
                            <Text style={{fontSize:this.props.panelFontSize, color:"white"}}>HỦY MUA</Text>
                        </TouchableOpacity>
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