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
import { } from '../redux/actions';
import Icon from "react-native-vector-icons/Ionicons";
import {CheckBox} from 'react-native-elements'
import { StackRouter } from 'react-navigation';


class ProcessTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCash: true,
            transactionstarted: false,
        };
        this.pickeditemid = this.props.navigation.state.params.id;
    }

    render() {
        return (
            <View style={{ display: "flex", flex: 1 }}>
                <View style={{ display: "flex", flex: 1, padding: 5, flexDirection: "row" }}>
                    <View style={{ display: "flex", flex: 2, flexDirection: "column", paddingHorizontal: 10, marginVertical: 5 }}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20}}>
                            THANH TOÁN BẰNG
                        </Text>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <View style={{flex:1}}>
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
                                    textStyle={{ fontSize: 18 }}
                                />
                            </View>
                            <View style={{width:70, display:"flex", justifyContent:"flex-start", alignItems:"center", paddingTop: 20}}>
                                {
                                    this.state.isCash 
                                    ? <Image style={{width: 70, height: 70 }} source={require('./cash.png')} />
                                    : <Image style={{width: 70, height: 70 }} source={require('./momo.png')} />
                                }
                            </View>
                            
                        </View>
                        <View style={{padding: 15}}>
                            <Button title="Thanh toán" onPress={()=>{this.setState({transactionstarted:true})}}/>
                        </View>
                    </View>
                    <View style={{ display: "flex", flex: 3, flexDirection: "column", paddingHorizontal: 10, marginVertical: 5, backgroundColor: "whitesmoke" }}>
                        {
                            (this.state.transactionstarted && this.state.isCash)
                            ?
                            (<View style={{ displat: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 20 }}>
                                    Mời Quý Khách Bỏ Tiền Vào Máy Để Trả Tiền Cho 1 {this.pickeditemid}
                                </Text>
                            </View>)
                            :
                            (this.state.transactionstarted && !this.state.isCash)
                            ?
                            (<View style={{ displat: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 20 }}>
                                    Mời Quý Khách Chờ Quét QR Để Trả Tiền Cho 1 {this.pickeditemid}
                                </Text>
                            </View>)
                            :
                            (<View></View>)
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProcessTransaction);