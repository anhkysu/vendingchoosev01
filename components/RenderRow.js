import React, { Component } from 'react';
import { View } from 'react-native';
import BeverageItem from './BeverageItem';
import BeverageSlot from './BeverageSlot';




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
            <View style={{ height: this.props.height, width: "100%", display: "flex", flexDirection: "row", marginBottom: 10, justifyContent: "center" }}>
                {
                    DATA.map((dataItem, index) => {
                        return (
                            this.props.itemStyle == "slotOriented" 
                            ?
                            (<BeverageSlot
                                myMethod1={(data)=> {this.props.myMethod(data)}}
                                key={index}
                                slotSetting={dataItem.slotsetting}
                                uid={dataItem.uid}
                                validSlots={dataItem.validslots}
                                slotFrom = {dataItem.from}
                                slotTo = {dataItem.to}
                                name={dataItem.name}
                                price={dataItem.price}
                                imageSource={dataItem.imagesource}
                                itemWidth={this.props.width}
                                itemHeight={this.props.height}
                                itemFontSize={this.props.itemFontSize}
                            />)
                            :
                            (<BeverageItem
                                myMethod1={(data)=> {this.props.myMethod(data)}}
                                key={index}
                                uid={dataItem.uid}
                                slotSetting={dataItem.slotsetting}
                                validSlots={dataItem.validslots}
                                slotFrom = {dataItem.from}
                                slotTo = {dataItem.to}
                                name={dataItem.name}
                                price={dataItem.price}
                                imageSource={dataItem.imagesource}
                                itemWidth={this.props.width}
                                itemHeight={this.props.height}
                                itemFontSize={this.props.itemFontSize}
                            />)
                        )
                    })
                }
            </View>
        )
    }
}





