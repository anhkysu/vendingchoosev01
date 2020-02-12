import React, {Component} from 'react';
import {
  Picker,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import DataInputItem from "../components/DataInputItem";
import {connect} from "react-redux";
import { updateOneSlotData, saveBeverageInfoChanges } from '../redux/actions'
import ImagePicker from 'react-native-image-picker'; 

const menuList = [
    {
        id: 0,
        label: "Slots Management",
        icon: require("./slot.png"),
    },
    {
        id: 1,
        label: "Information Settings",
        icon: require("./info.png"),
    },
    {
        id: 2,
        label: "Passwords",
        icon: require("./security.png"),
    },
    {
        id: 3,
        label: "Program Update",
        icon: require("./program.png"),
    },
    {
        id: 4,
        label: "Payment Settings",
        icon: require("./payment.png"),
    },
    {
        id: 5,
        label: "Slot Links",
        icon: require("./setting.png"),
    },
    {
        id: 6,
        label: "SerialPort Settings",
        icon: require("./serial.png"),
    },
    {
        id: 7,
        label: "Machine Settings",
        icon: require("./setting.png"),
    },
    {
        id: 8,
        label: "Layout Settings",
        icon: require("./setting.png"),
    },
    {
        id: 9,
        label: "Product Settings",
        icon: require("./setting.png"),
    },
]

class SettingMenuPage extends Component {
    constructor(props){
        super(props);
        this.state = {
           processedMenuList: [],
        }
    }

    processMenu(menuListData, noOfRow, noOfCol){
        var newProcessMenuList = [];
        for(i=0;i<noOfRow*2;i+=2){
            var chunkArray = menuListData.slice(i , noOfCol + i );
            newProcessMenuList.push(chunkArray);
        }
        this.setState({processedMenuList: newProcessMenuList});
    }

    componentDidMount(){
        this.processMenu(menuList, 5, 2);
    }

    processMenuTouch(data){
        var newPageString = data.replace(" ","");
        this.props.navigation.navigate(newPageString);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: "whitesmoke" }}>
                        {
                            this.state.processedMenuList.map((item,index)=>{
                                return (
                                    <View key={index} style={{height: 150, display:"flex", flexDirection:"row"}}>
                                       {
                                            item.map((subitem, subindex) => {
                                                return (
                                                    <View key={subindex} style={{ flex: 1, backgroundColor: "whitesmoke", alignItems: "center", justifyContent: "center", paddingBottom: 20 }}>
                                                        <TouchableOpacity onPress={()=>{this.processMenuTouch(subitem.label)}} style={{flex: 1, alignItems:"center", justifyContent:"center"}}>
                                                            <View style={{ width: Number(this.props.settingdatalist[7].datainput) * 2, height: Number(this.props.settingdatalist[7].datainput) * 2, padding: 20, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <Image source={subitem.icon} resizeMode={'contain'} style={{ width: Number(this.props.settingdatalist[7].datainput) * 2, height: Number(this.props.settingdatalist[7].datainput) * 2, }} />
                                                            </View>

                                                            <Text style={{ fontSize: 20 }}>
                                                                {subitem.label}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                              })
                                       }
                                    </View>
                                );
                            })                            
                        }
                </ScrollView>
                <View style={{ height: 50, width: "100%", alignItems: "center", backgroundColor: "white", justifyContent: "center", flexDirection: "row" }}>
                    <View style={{ height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
                        <Button title="Quay lại Home" onPress={()=>{this.props.navigation.navigate("Home")}}/>
                    </View>
                </View>
            </View>
        );
    }

};


function mapStateToProps(state){
    return {
        settingdatalist: state.settingpage1reducer.settingdatalist,
        currentslotsetting: state.settingpage1reducer.currentslotsetting,
        oneslotdata: state.settingpage1reducer.oneslotdata,
        initialbeveragestate: state.settingpage1reducer.initialbeveragestate,
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateOneSlotData: data => {dispatch(updateOneSlotData(data))},
        saveBeverageInfoChanges: (slotsetting, name, price, validslots, imagesource) => {dispatch(saveBeverageInfoChanges(slotsetting, name, price, validslots, imagesource))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingMenuPage);