import React, { Component } from 'react';
import { View } from 'react-native';
import BeverageItem from './BeverageItem';




export default class RenderRow extends Component {
    constructor(props) {
        super(props);
         
    }

    myMethod(tes){
        console.log(tes);
    }

    render() {
        const DATA = this.props.rowDataInput;
        return (
            <View style={{ height: 130, width: "100%", display: "flex", flexDirection: "row", marginBottom: 10, justifyContent: "center" }}>
                {
                    DATA.map((dataItem) => {
                        return (
                            <BeverageItem
                                myMethod1={(data)=> {this.props.myMethod(data)}}
                                key={dataItem.slotsetting}
                                slotSetting={dataItem.slotsetting}
                                validSlots={dataItem.validslots}
                                name={dataItem.name}
                                price={dataItem.price}
                                imageSource={dataItem.imagesource}
                            />
                        )
                    })
                }
            </View>
        )
    }
}





