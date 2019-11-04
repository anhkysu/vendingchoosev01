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
import {connect} from "react-redux";
import { updateOneSlotData } from '../redux/actions'

class SettingPage1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            
        }
    }

    loadBeverageItem(slotsetting){
        //console.log(this.props.currentslotsetting);
        this.props.initialbeveragestate.map((item)=>{
            if(item.slotsetting == slotsetting){
                var newoneslotdata = [
                    {
                        itemlabel: "Slot Setting",
                        datainputtype: "TextInput",
                        options: {"nope":"nope"},
                        datainput: item.slotsetting
                    },
                    {
                        itemlabel: "Tên Nước",
                        datainputtype: "TextInput",
                        options: {"nope":"nope"},
                        datainput: item.name
                    },
                    {
                        itemlabel: "Giá Tiền",
                        datainputtype: "TextInput",
                        options: {"nope":"nope"},
                        datainput: item.price
                    },
                    {
                        itemlabel: "Số Lượng",
                        datainputtype: "TextInput",
                        options: {"nope":"nope"},
                        datainput: item.validslots,
                    },
                ];

                this.props.updateOneSlotData(newoneslotdata);
            }
        });
    }

    render() {    
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: "row", backgroundColor: "whitesmoke" }}>
                    <View style={{ flex: 2, paddingVertical: 7, overflow: "hidden" }}>
                        <ScrollView setScrollbarFadingEnabled={false}>
                            {
                                this.props.settingdatalist.map((datainput,index)=>{
                                    return (<DataInputItem key={index} itemlabel={datainput.itemlabel} datainputtype={datainput.datainputtype} defaultvalue={datainput.datainput} pickeroptions={datainput.options}/>)
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={{ flex: 2, backgroundColor: "#d0e0fb", margin: 10, borderWidth: 1, borderColor: "#3e81f4", borderRadius: 5, display: "flex", padding: 10 }}>
                        <View style={{ flex: 1, marginBottom: 10 }}>
                            <ScrollView style={{ flex: 1 }}>
                                {
                                    this.props.oneslotdata.map((datainput,index)=>{
                                        return (<DataInputItem key={index} itemlabel={datainput.itemlabel} datainputtype={datainput.datainputtype} defaultvalue={datainput.datainput} pickeroptions={datainput.options}/>)
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
                            <View style={{ paddingRight: 10 }}><Button title="Load" onPress={()=>{this.loadBeverageItem(this.props.currentslotsetting)}}/></View>
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


function mapStateToProps(state){
    return {
        settingdatalist: state.settingdatalist,
        currentslotsetting: state.currentslotsetting,
        oneslotdata: state.oneslotdata,
        initialbeveragestate: state.initialbeveragestate,
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateOneSlotData: data => {dispatch(updateOneSlotData(data))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage1);