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

import {connect} from "react-redux";
import { updateOneSlotData, saveBeverageInfoChanges } from '../../redux/actions';


class Passwords extends Component {
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    render() {    
        return (
            <View style={{ flex: 1 }}>
                
            </View>
        );
    }

    componentDidMount(){
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Passwords);