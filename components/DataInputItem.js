import React, { Component } from 'react';
import { View, Text, Picker, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { testFunc, changeCoupleInput } from '../redux/actions'

const testpickeroptions = {
    "Love": "1",
    "Promotion": "2",
    "Money": "3",
    "Dream": "4"
}

class DataInputItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const itemlabel = this.props.itemlabel;
        const datainputtype = this.props.datainputtype; //TextInput //Picker
        var itemdefaultvalue = this.props.defaultvalue;
        var pickeroptions = this.props.pickeroptions;
        if (pickeroptions === undefined) {
            pickeroptions = testpickeroptions;
        }
        return (
            <View style={{ height: 40, width: "90%", maxWidth: 300, marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
                <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                    <Text numberOfLines={1}>{itemlabel}</Text>
                </View>
                {
                    datainputtype == 'TextInput'
                        ?
                        (<View style={{ flex: 1 }}>
                            <TextInput 
                                style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white", textAlign: "center", fontSize: 16 }} 
                                onChangeText={(text)=>{this.props.changeCoupleInput(this.props.itemlabel,text)}}
                                value={itemdefaultvalue}
                            />
                        </View>)
                        :
                        (<View style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "white", borderColor: "gray", borderRadius: 3 }}>
                            <Picker
                                selectedValue={itemdefaultvalue}
                                style={{ height: 50, width: 100 }}
                                onValueChange={(itemValue, itemIndex) => { this.props.changeCoupleInput(this.props.itemlabel, itemValue) }}>
                                {
                                    Object.keys(pickeroptions).map((key) => {
                                        return (
                                            <Picker.Item key={key} label={key} value={pickeroptions[key]} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>)
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
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DataInputItem);

