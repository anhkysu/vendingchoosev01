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

class TestMachine extends Component {
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    render() {    
        return (
            <View style={{ flex: 1, backgroundColor: "#d0e0fb", margin: 10, borderWidth: 1, borderColor: "#3e81f4", borderRadius: 5, display: "flex", padding: 10 }}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <ScrollView style={{ flex: 1 }}>
                        {
                            this.props.testMachine.map((datainput, index) => {
                                return (<DataInputItem key={index} parentDataKey={"testMachine"} itemlabel={datainput.itemlabel} datainputtype={datainput.datainputtype} defaultvalue={datainput.datainput} pickeroptions={datainput.options} constraint={datainput.constraint} />)
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ height: 40, width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", paddingVertical: 2 }}>
                    
                    <View style={{ paddingRight: 10 }}>
                        <Button title="Chạy thử"
                            
                        />
                    </View>
                    <View style={{ paddingRight: 10 }}>
                        <Button title="Dừng"
                            
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
        testMachine: state.settingpage1reducer.testMachine
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateOneSlotData: data => {dispatch(updateOneSlotData(data))},
        saveBeverageInfoChanges: (slotsetting, name, price, validslots, imagesource) => {dispatch(saveBeverageInfoChanges(slotsetting, name, price, validslots, imagesource))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestMachine);