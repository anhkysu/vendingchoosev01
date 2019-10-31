import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

export default class LoginPage extends Component {
    render() {
    
        return (
            <View style={{ display: "flex", flex: 1 }}>

                <View style={{ display: "flex", flex: 1, padding: 5, alignItems: "center", justifyContent: "center" }}>
                    <View style={{ width: "60%", minWidth: 300, height: "auto", display: "flex", flexDirection: "column", paddingHorizontal: 10, marginVertical: 5 }}>
                        <View style={{ width: "100%", height: 40, marginBottom: 5, display: "flex", flexDirection: "row" }}>
                            <View style={{ width: 90, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Username</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                />
                            </View>
                        </View>

                        <View style={{ width: "100%", height: 40, marginBottom: 5, display: "flex", flexDirection: "row" }}>
                            <View style={{ width: 90, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Passwords</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                />
                            </View>
                        </View>

                        <View style={{ width: "100%", height: 40, marginTop: 10 }}>
                            <Button title="SIGN IN" onPress={()=>{this.props.navigation.navigate("SettingPage1")}}/>
                        </View>
                    </View>
                </View>
                
                <View style={{ height: 50, width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                    <View style={{ width: 200, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
                        <Button title="Quay lại Home" onPress={()=>{this.props.navigation.navigate("Home")}}/>

                    </View>
                    <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>

                        <View style={{ width: 200, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

                        </View>

                    </View>
                    <View style={{ width: 200, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>

                    </View>
                </View>
            </View>
        );

    }
  
};



