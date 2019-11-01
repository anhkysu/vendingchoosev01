import React, { Component } from 'react';
import { View, Text, Picker, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { changeNumberOfCol } from '../redux/actions';
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

    callFunctionCorrespondingToDataInput(itemlabel,datainput){
        switch(itemlabel){
            case "Số Cột Hiển Thị":
                this.props.changeNoOfCol(datainput)
            default:
                return
        }
    }

    render() {
        const itemlabel = this.props.itemlabel;
        const datainputtype = this.props.datainputtype; //TextInput //Picker
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
                                style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }} 
                                onChangeText={(text)=>{this.callFunctionCorrespondingToDataInput(itemlabel,text)}}
                            />
                        </View>)
                        :
                        (<View style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", backgroundColor: "white", borderColor: "gray", borderRadius: 3 }}>
                            <Picker
                                //selectedValue={"java"}
                                style={{ height: 50, width: 100 }}
                                onValueChange={(itemValue, itemIndex) => { alert(itemValue); }}>
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

function mapStateToProps(state ) {
	return {
    noofcol: state.noofcol
	}
}

const mapDispatchToProps = dispatch => ({
    changeNoOfCol: numberofcolumn => dispatch(changeNumberOfCol(numberofcolumn)) ,
})

export default connect(mapStateToProps, mapDispatchToProps)(DataInputItem);

