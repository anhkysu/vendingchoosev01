import React, {Component} from 'react';
import {
  Picker,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

export default class SettingPage1 extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, flexDirection: "row", backgroundColor: "whitesmoke" }}>
                    <View style={{ flex: 2, paddingVertical: 7, overflow: "hidden" }}>
                        <ScrollView setScrollbarFadingEnabled={false}>
                            <View style={{ height: 40, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                                    <Text>Số lượng slot</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                    />
                                </View>
                            </View>

                            <View style={{ height: 40, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                                    <Text>Số cột hiển thị</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                    />
                                </View>
                            </View>

                            <View style={{ height: 40, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                    <Text numberOfLines={1}>Time chuyển trang</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                    />
                                </View>
                            </View>

                            <View style={{ height: 30, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                    <Text numberOfLines={1}>COM</Text>
                                </View>
                                <View style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "white", borderColor: "gray", borderRadius: 3 }}>
                                    <Picker
                                        selectedValue={"java"}
                                        style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue, itemIndex) => { }
                                        }>
                                        <Picker.Item label="COM1" value="java" />
                                        <Picker.Item label="COM2" value="js" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={{ height: 30, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                    <Text numberOfLines={1}>Baudrate</Text>
                                </View>
                                <View style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "white", borderColor: "gray", borderRadius: 3 }}>
                                    <Picker
                                        selectedValue={"java"}
                                        style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue, itemIndex) => { }
                                        }>
                                        <Picker.Item label="115200" value="java" />
                                        <Picker.Item label="62500" value="js" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={{ height: 30, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                    <Text numberOfLines={1}>Databits</Text>
                                </View>
                                <View style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "white", borderColor: "gray", borderRadius: 3 }}>
                                    <Picker
                                        selectedValue={"java"}
                                        style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue, itemIndex) => { }
                                        }>
                                        <Picker.Item label="8" value="8" />
                                        <Picker.Item label="16" value="16" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={{ height: 30, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                    <Text numberOfLines={1}>Parity</Text>
                                </View>
                                <View style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "white", borderColor: "gray", borderRadius: 3 }}>
                                    <Picker
                                        selectedValue={"java"}
                                        style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue, itemIndex) => { }
                                        }>
                                        <Picker.Item label="None" value="java" />
                                        <Picker.Item label="JavaScript" value="js" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={{ height: 30, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                                    <Text numberOfLines={1}>Stopbit</Text>
                                </View>
                                <View style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "white", borderColor: "gray", borderRadius: 3 }}>
                                    <Picker
                                        selectedValue={"java"}
                                        style={{ height: 50, width: 100 }}
                                        onValueChange={(itemValue, itemIndex) => { }
                                        }>
                                        <Picker.Item label="One" value="java" />
                                        <Picker.Item label="Two" value="js" />
                                    </Picker>
                                </View>
                            </View>

                        </ScrollView>
                    </View>

                    <View style={{ flex: 2, backgroundColor: "#d0e0fb", margin: 10, borderWidth: 1, borderColor: "#3e81f4", borderRadius: 5, display: "flex", padding: 10 }}>
                        <View style={{ flex: 1, marginBottom: 10 }}>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={{ height: 40, width: 300, marginVertical: 3, display: "flex", flexDirection: "row" }}>
                                    <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text>Slot Setting</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                        />
                                    </View>
                                </View>

                                <View style={{ height: 40, width: 300, marginVertical: 3, display: "flex", flexDirection: "row" }}>
                                    <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text>Tên nước</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                        />
                                    </View>
                                </View>

                                <View style={{ height: 40, width: 300, marginVertical: 3, display: "flex", flexDirection: "row" }}>
                                    <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text>Giá tiền</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                        />
                                    </View>
                                </View>

                                <View style={{ height: 40, width: 300, marginVertical: 3, display: "flex", flexDirection: "row" }}>
                                    <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text>Số lượng</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
                                        />
                                    </View>
                                </View>

                                <View style={{ height: 150, width: 300, marginTop: 5, display: "flex" }}>
                                    <View style={{ height: 20, width: 300, display: "flex", flexDirection: "row", marginBottom: 5 }}>
                                        <Text>Chọn hình hiển thị</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "whitesmoke", display: "flex", flexDirection: "row" }}>
                                        <View style={{ flex: 1, paddingVertical: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <View style={{ width: 100, height: 100, backgroundColor: 'white' }}>

                                            </View>
                                        </View>
                                        <View style={{ width: 60, height: "100%", alignItems: "flex-end", justifyContent: "flex-end", paddingBottom: 5, paddingRight: 5 }}>
                                            <Button title="Chọn" />
                                        </View>
                                    </View>

                                </View>

                            </ScrollView>
                        </View>
                        <View style={{ height: 40, width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingVertical: 2 }}>
                            <View style={{ paddingRight: 10 }}><Button title="Load" /></View>
                            <View style={{ paddingRight: 10 }}><Button title="Lưu thông tin" /></View>
                        </View>
                    </View>
                </View>


                <View style={{ height: 50, width: "100%", alignItems: "center", backgroundColor: "white", justifyContent: "center", flexDirection: "row" }}>
                    <View style={{ width: 200, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
                        <Button title="Quay lại Home" />

                    </View>
                    <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 150, height: "80%" }}>

                        </View>
                    </View>
                    <View style={{ width: 200, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
                        <Button title="Danh sách nước" onPress={()=>{this.props.navigation.navigate("SettingPage2")}}/>
                    </View>
                </View>
            </View>
        );
    }
  
};

