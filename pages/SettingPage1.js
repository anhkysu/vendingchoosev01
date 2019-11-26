import React, {Component} from 'react';
import {
  Picker,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert
} from 'react-native';
import DataInputItem from "../components/DataInputItem";
import {connect} from "react-redux";
import { updateOneSlotData, saveBeverageInfoChanges } from '../redux/actions'
import ImagePicker from 'react-native-image-picker'; 

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    allowsEditing: false,
  };
  

class SettingPage1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatarSource: "content://media/external/images/media/47",
            isNew: true,
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
                this.setState({avatarSource: item.imagesource});
                this.props.updateOneSlotData(newoneslotdata);
            }
        });
    }

    saveBeverageItemData(slotsetting, name, price, validslots, imagesource ){
        this.props.saveBeverageInfoChanges(slotsetting, name, price, validslots, imagesource);
        Alert.alert("Notification", "New changes was saved succesfully")
    }

    handleImagePicker(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response oriURL = ', response.uri);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = response.uri ;
              //const data = {path: "file:///storage/emulated/0/Pictures/RCTCameraModule/IMG_20160706_185559.jpg"}
              // You can also display the image using data:
              //const source = { uri: 'data:image/png;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
              });
            }
          });
    }

    render() {    
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: "row", backgroundColor: "whitesmoke" }}>
                    <View style={{ flex: 1, paddingVertical: 7, overflow: "hidden" }}>
                        <ScrollView setScrollbarFadingEnabled={false}>
                            {
                                this.props.settingdatalist.map((datainput,index)=>{
                                    return (<DataInputItem key={index} itemlabel={datainput.itemlabel} datainputtype={datainput.datainputtype} defaultvalue={datainput.datainput} pickeroptions={datainput.options}/>)
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={{ flex: 1, backgroundColor: "#d0e0fb", margin: 10, borderWidth: 1, borderColor: "#3e81f4", borderRadius: 5, display: "flex", padding: 10 }}>
                        <View style={{ flex: 1, marginBottom: 10 }}>
                            <ScrollView style={{ flex: 1 }}>
                                {
                                    this.props.oneslotdata.map((datainput,index)=>{
                                        return (<DataInputItem key={index} itemlabel={datainput.itemlabel} datainputtype={datainput.datainputtype} defaultvalue={datainput.datainput} pickeroptions={datainput.options}/>)
                                    })
                                }
                                <View style={{ height: 300, width: "100%", marginTop: 5, display: "flex" }}>
                                    <View style={{ height: 40, width: 300, display: "flex", flexDirection: "row", marginBottom: 5, marginLeft:15}}>
                                        <Text style={{fontSize: 17}}>Chọn hình hiển thị</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "whitesmoke", display: "flex", flexDirection: "row" , marginLeft: "5%"}}>
                                        <View style={{ flex: 1, paddingVertical: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <View style={{ width: 200, height: 200, backgroundColor: 'white'}}>
                                                <Image
                                                    style={{ height: "100%", width: "auto", backgroundColor: "transparent" }}
                                                    source={{uri: this.state.avatarSource}}
                                                    resizeMode="contain"
                                                    overlayColor = "blue"
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: 70, height: "100%", alignItems: "flex-end", justifyContent: "flex-end", paddingBottom: 5, paddingRight: 5 }}>
                                            <Button title="Chọn" onPress={()=>{this.handleImagePicker()}}/>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{ height: 40, width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", paddingVertical: 2 }}>
                            <View style={{ paddingRight: 10 }}><Button title="Load" onPress={()=>{this.loadBeverageItem(this.props.currentslotsetting)}}/></View>
                            <View style={{ paddingRight: 10 }}>
                                <Button title="Lưu thông tin" 
                                        onPress={()=>{this.saveBeverageItemData(this.props.oneslotdata[0].datainput,
                                                                                this.props.oneslotdata[1].datainput,
                                                                                this.props.oneslotdata[2].datainput,
                                                                                this.props.oneslotdata[3].datainput,
                                                                                this.state.avatarSource)
                                                }}
                                />
                            </View>
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

    componentDidMount(){
        if(this.state.isNew){
            this.loadBeverageItem("1");
            this.setState({isNew: false});
        }
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
        updateOneSlotData: data => {dispatch(updateOneSlotData(data))},
        saveBeverageInfoChanges: (slotsetting, name, price, validslots, imagesource) => {dispatch(saveBeverageInfoChanges(slotsetting, name, price, validslots, imagesource))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage1);