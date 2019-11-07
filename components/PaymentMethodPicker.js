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
            <View style={{ display: "flex", flex: 1 }}>
                
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