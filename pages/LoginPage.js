import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native';
import adminCredential from '../data/AdminCredential';

const authorizationserverurl1 = "http://172.16.200.46:3333/diyoath";

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "nope",
            passwords: "nope",
            token: "error",
            loading: false,
        }
    }
    test(){
        this.props.navigation.navigate('SettingMenuPage');
    }

    attemptToLogin(token) {
        this.setState({loading:false});
        if (token == "error") {
            Alert.alert("Thông tin nhập chưa chính xác");
        }
        else {
            this.props.navigation.navigate('SettingMenuPage');
        }
    }

    authorize(username, passwords) {
        this.setState({ loading: true });
        if (username == "nope" || passwords == "nope") {
            this.setState({ loading: false }); 
            return;
        }

        else if (username == adminCredential.username && passwords == adminCredential.passwords) {
            setTimeout(() => {
                this.setState({ loading: false });
                this.props.navigation.navigate('SettingMenuPage');
            }, 1000);
        }

        else {
            fetch(authorizationserverurl1, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    username: this.state.username,
                    passwords: this.state.passwords
                })
            })
                .then((response) => { response.json() })
                .then((responseJson) => {
                    this.setState({ token: responseJson.token });
                    setTimeout(() => {
                        this.attemptToLogin(this.state.token);
                    }, 500)
                })
                .catch((e) => {
                    alert("Server Internal Error:" + e);
                    this.setState({ loading: false });
                })
        }
    }

    render() {
        return (
            <View style={{ display: "flex", flex: 1 }}>
                {
                    this.state.loading && (
                    <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "white", opacity: 0.3, zIndex: 999, display: "flex", alignItems: "center", justifyContent:"center" }}>
                        <ActivityIndicator size="large"/>
                    </View>)
                }
                {
                    !this.state.loading &&
                    (
                        <View style={{ display: "flex", flex: 1 }}>
                        <View style={{ display: "flex", flex: 1, padding: 5, alignItems: "center", justifyContent: "center" }}>
                            <View style={{ width: "30%", minWidth: 300, height: "auto", display: "flex", flexDirection: "column", paddingHorizontal: 10, marginVertical: 5 }}>
                                <View style={{ width: "100%", height: 40, marginBottom: 5, display: "flex", flexDirection: "row" }}>
                                    <View style={{ width: 90, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Username</Text>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <TextInput
                                            style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                            onChangeText={(text) => { this.setState({ username: text }) }}
                                        />
                                    </View>
                                </View>

                                <View style={{ width: "100%", height: 40, marginBottom: 5, display: "flex", flexDirection: "row" }}>
                                    <View style={{ width: 90, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Passwords</Text>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <TextInput
                                            style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                            onChangeText={(pass) => { this.setState({ passwords: pass }) }}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                </View>

                                <View style={{ width: "100%", height: 40, marginTop: 10 }}>
                                    <Button title="SIGN IN" onPress={() => { /*this.authorize(this.state.username, this.state.passwords)*/ this.test() }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 70, width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                            <View style={{ width: 200, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
                                <Button title="Quay lại Home" onPress={() => { this.props.navigation.navigate("Home") }} />

                            </View>
                            <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: 200, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                </View>
                            </View>
                            <View style={{ width: 200, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>

                            </View>
                        </View>
                        </View>
                    )
                }

            </View>
        );

    }

};



