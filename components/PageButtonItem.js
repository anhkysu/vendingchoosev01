import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class PageButtonItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const pagenumber = this.props.pagenumber;
        return (
            <View style={{ padding: 5, marginHorizontal: 5, borderRadius: 10, backgroundColor: "white", width: 30 }}>
                <Text style={{ fontSize: this.props.pageNumberFontSize, textAlign: "center", color: (this.props.disabledStyle ? "gray" : "black") }}>{pagenumber}</Text>
            </View>
        )
    }
}





