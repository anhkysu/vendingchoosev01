import React, { Component } from 'react';
import { View, Text, Picker, TextInput, Switch } from 'react-native';
import { connect } from 'react-redux';
import { testFunc, changeCoupleInput, changeCurrentSlotSetting, changeSlotData } from '../redux/actions'
import DateTimePicker from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';

const testpickeroptions = {
    "Love": "1",
    "Promotion": "2",
    "Money": "3",
    "Dream": "4"
}

class DataInputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            defaultvalue: this.props.defaultvalue,
            pickeroptions: this.props.pickeroptions
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked(date) {
        console.log("A date has been picked: ", date);
        this.setState({defaultvalue: date.getHours()+":"+date.getMinutes()});
        this.hideDateTimePicker();
    };

    processCoupleInput(label, text){
        console.log(label);
        if(label == "Slot Setting"){
            this.props.changeCurrentSlotSetting(text);
        }
        else if(label == "Tên Nước" || label == "Giá Tiền" || label == "Số Lượng"){
            this.props.changeSlotData(label, text);
        }
        else {
            this.props.changeCoupleInput(label, text);
            console.log("NG");
        }
    }

    onSwitch(data){
        console.log(data);
    }

    renderPicker() {
        return(
         <View style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "white", borderColor: "gray", borderRadius: 3 }}>
            <Picker
                selectedValue={this.state.defaultvalue}
                itemTextStyle={{ fontSize: 20 }}
                style={{ height: 50, width: "95%" }}
                onValueChange={(itemValue, itemIndex) => { this.processCoupleInput(this.props.itemlabel, itemValue) }}>
                {
                    Object.keys(this.state.pickeroptions).map((key) => {
                        return (
                            <Picker.Item key={key} label={key} value={this.state.pickeroptions[key]} />
                        )
                    })
                }
            </Picker>
        </View>)
    }

    renderTextInput(){
        return (
            (<View style={{ flex: 1 }}>
                <TextInput 
                    style={{ height: 50, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white", textAlign: "center", fontSize: 17 }} 
                    onChangeText={(text)=>{this.processCoupleInput(this.props.itemlabel,text)}}
                    value={this.state.defaultvalue}
                />
            </View>)
        )
    }

    renderLockedLabel(){
        return (
            (<View style={{ flex: 1 }}>
                <TextInput 
                    style={{ height: 50, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white", textAlign: "center", fontSize: 17 }} 
                    onChangeText={(text)=>{this.processCoupleInput(this.props.itemlabel,text)}}
                    value={this.state.defaultvalue}
                    editable={false}
                />
            </View>)
        )
    }

    renderDateTime(format){
        if(format == "TimePicker"){
            return (
                <View style={{ flex: 1, display:"flex", flexDirection:"row", alignItems:"center" }}>
                    <TouchableOpacity style={{width: 50, height: "100%", backgroundColor: "dodgerblue", display:"flex", alignItems:"center", justifyContent:"center"}} onPress={()=>{this.showDateTimePicker()}}>
                        <Text style={{color:"white"}}>PICK</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={{ height: 50, flex: 1, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white", textAlign: "center", fontSize: 17 }}
                        value={this.state.defaultvalue}
                        editable={false}
                    />
                </View>
            )
        }
        else return null
    }

    renderSwitch() {

        return (
            <View style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Switch
                    onValueChange={(data)=>{this.onSwitch(data)}}
                    value={this.state.defaultvalue} />
            </View>
        )
    }

    

    render() {
        const itemlabel = this.props.itemlabel;
        const datainputtype = this.props.datainputtype; //TextInput //Picker
 
        return (
            <View style={{ height: 50, width: "100%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3, paddingLeft: 15 }}>
                <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        locale="en_GB"
                        mode={"time"}
                        onConfirm={(data)=>this.handleDatePicked(data)}
                        onCancel={()=>this.hideDateTimePicker()}
                />
                <View style={{ width: 180, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                    <Text style={{fontSize: 17}}>{itemlabel}</Text>
                </View>
                {
                    datainputtype == 'TextInput'
                        ?
                        this.renderTextInput()   
                        :
                        datainputtype == 'TimePicker'    
                        ?
                        this.renderDateTime('TimePicker')            
                        :
                        datainputtype == 'Switch'    
                        ?
                        this.renderSwitch()            
                        :
                        datainputtype == 'TextLabel'    
                        ?
                        this.renderLockedLabel()            
                        :
                        this.renderPicker()
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
	return {
        settingdatalist: state.settingdatalist
	}
}

function mapDispatchToProps( dispatch ) {
    return {
        changeCoupleInput: (itemlabel, datainput) => dispatch(changeCoupleInput(itemlabel,datainput)),
        testFunc: testVarInput => dispatch(testFunc(testVarInput)),
        changeCurrentSlotSetting: currentnumber => dispatch(changeCurrentSlotSetting(currentnumber)),
        changeSlotData: (itemlabel, datainput) => dispatch(changeSlotData(itemlabel,datainput)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataInputItem);

