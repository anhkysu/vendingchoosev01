import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';


export default class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            notifButton: [{text:"Ok", onPress: ()=>Alert.alert("ok")}],
        };
    }

    render() {
        const notifTitle = this.props.title;
        const notifDetail = this.props.description;
        const notifButtonArray = this.props.buttonArray;
        return (
            <View style={{ backgroundColor: "white", width: this.props.panelWidth, height: this.props.panelHeight, borderRadius: 5, display: "flex" }}>
                <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: this.props.notifFontSize, padding: 10, fontWeight: "bold", color: "dodgerblue" }}>
                        {notifTitle}
                    </Text>
                </View>
                <View style={{ flex: 1, backgroundColor: "whitesmoke", display: "flex", alignItems: "center", justifyContent: "center", paddingHorizontal: 20 }}>
                    <Text style={{fontSize: this.props.notifFontSize * 1.3}}>
                        {notifDetail}
                    </Text>
                    
                </View>
                <View style={{ paddingRight: 20, paddingVertical: 7, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>
                        {notifButtonArray.map((item,index)=>{
                            return(
                                <TouchableOpacity key={index} onPress={item.onPress} style={{backgroundColor:"dodgerblue", padding: 7, paddingHorizontal: 15, borderRadius: 6, marginLeft: 15}}>
                                    <Text style={{ color: "white", fontSize: this.props.notifFontSize}}>{item.text}</Text>
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </View>
        )
    }
}



