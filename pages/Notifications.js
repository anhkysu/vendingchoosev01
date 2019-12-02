import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Dimensions,
    Alert,
    DeviceEventEmitter,
    ActivityIndicator
  } from 'react-native';

export default class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        const notifTitle = this.props.title;
        const notifDetail = this.props.description;
        return (
            <View style={{ backgroundColor: "white", width: "70%", minHeight: "50%", borderRadius: 5, display: "flex" }}>
                <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 18, padding: 10, fontWeight: "bold", color: "dodgerblue" }}>
                        {notifTitle}
                    </Text>
                </View>
                <View style={{ flex: 1, backgroundColor: "whitesmoke", display: "flex", alignItems: "center", justifyContent: "center", paddingHorizontal: 20 }}>
                    <Text style={{fontSize: 21}}>
                        {notifDetail}
                    </Text>
                </View>
            </View>

        )
    }
}



