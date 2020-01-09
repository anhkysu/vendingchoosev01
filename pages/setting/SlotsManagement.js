import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert
} from 'react-native';

import {connect} from "react-redux";
import { updateOneSlotData, saveBeverageInfoChanges } from '../../redux/actions';
import DataInputItem from "../../components/DataInputItem";
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

class SlotsManagement extends Component {
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

    handleImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response oriURL = ', response.uri);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response.uri;
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    render() {    
        return (
            <View style={{ flex: 1, backgroundColor: "#d0e0fb", margin: 10, borderWidth: 1, borderColor: "#3e81f4", borderRadius: 5, display: "flex", padding: 10 }}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <ScrollView style={{ flex: 1 }}>
                        {
                            this.props.slotsManagement.map((datainput, index) => {
                                return (<DataInputItem key={index} itemlabel={datainput.itemlabel} datainputtype={datainput.datainputtype} defaultvalue={datainput.datainput} pickeroptions={datainput.options} constraint={datainput.constraint}/>)
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ height: 40, width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2 }}>
                    
                    <View style={{ paddingRight: 10 }}>
                        <Button title="Cập nhật thông số máy"
                            
                        />
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount(){
        
    }
};


function mapStateToProps(state){
    return {
        settingdatalist: state.settingdatalist,
        slotsManagement: state.slotsManagement,
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

export default connect(mapStateToProps, mapDispatchToProps)(SlotsManagement);