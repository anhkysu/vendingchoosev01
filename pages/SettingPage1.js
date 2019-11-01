import React, {Component} from 'react';
import {
  Picker,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import DataInputItem from "../components/DataInputItem";

const datainputitemlist = [
    {
        itemlabel: "Số Lượng Slot",
        datainputtype: "TextInput",
        options: {"nope":"nope"}
    },
    {
        itemlabel: "Số Cột Hiển Thị",
        datainputtype: "TextInput",
        options: {"nope":"nope"}
    },
    {
        itemlabel: "Time Chuyển Trang",
        datainputtype: "TextInput",
        options: {"nope":"nope"}
    },
    {
        itemlabel: "COM",
        datainputtype: "Picker",
        options: {"COM1":"COM1", "COM2": "COM2"}
    },
    {
        itemlabel: "Baudrate",
        datainputtype: "Picker",
        options: {"115200": "115200", "62500": "62500"}
    },
    {
        itemlabel: "Databits",
        datainputtype: "Picker",
        options: {"8":"8", "16": "16"}
    },
    {
        itemlabel: "Parity",
        datainputtype: "Picker",
        options: {"odd":"odd", "even": "even"}
    },
    {
        itemlabel: "Stop Bit",
        datainputtype: "Picker",
        options: {"1":"1", "2": "2"}
    },
];

const datainputitemlist2 = [
    {
        itemlabel: "Slot Setting",
        datainputtype: "TextInput",
        options: {"nope":"nope"}
    },
    {
        itemlabel: "Tên Nước",
        datainputtype: "TextInput",
        options: {"nope":"nope"}
    },
    {
        itemlabel: "Giá Tiền",
        datainputtype: "TextInput",
        options: {"nope":"nope"}
    },
    {
        itemlabel: "Số Lượng",
        datainputtype: "TextInput",
        options: {"nope":"nope"}
    },
];

export default class SettingPage1 extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1, flexDirection: "row", backgroundColor: "whitesmoke" }}>
                    <View style={{ flex: 2, paddingVertical: 7, overflow: "hidden" }}>
                        <ScrollView setScrollbarFadingEnabled={false}>
                            {
                                datainputitemlist.map((datainput,index)=>{
                                    return (<DataInputItem key={index} itemlabel={datainput.itemlabel} datainputtype={datainput.datainputtype} pickeroptions={datainput.options}/>)
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={{ flex: 2, backgroundColor: "#d0e0fb", margin: 10, borderWidth: 1, borderColor: "#3e81f4", borderRadius: 5, display: "flex", padding: 10 }}>
                        <View style={{ flex: 1, marginBottom: 10 }}>
                            <ScrollView style={{ flex: 1 }}>
                                {
                                    datainputitemlist2.map((datainput,index)=>{
                                        return (<DataInputItem key={index} itemlabel={datainput.itemlabel} datainputtype={datainput.datainputtype} pickeroptions={datainput.options}/>)
                                    })
                                }

                                <View style={{ height: 150, width: 300, marginTop: 5, display: "flex" }}>
                                    <View style={{ height: 20, width: 300, display: "flex", flexDirection: "row", marginBottom: 5, marginLeft: "5%" }}>
                                        <Text>Chọn hình hiển thị</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "whitesmoke", display: "flex", flexDirection: "row" , marginLeft: "5%"}}>
                                        <View style={{ flex: 1, paddingVertical: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <View style={{ width: 100, height: 100, backgroundColor: 'white'}}>

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
                        <Button title="Quay lại Home" onPress={()=>{this.props.navigation.navigate("Home")}}/>

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

