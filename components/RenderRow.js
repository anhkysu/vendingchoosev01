import React, { Component } from 'react';
import { View } from 'react-native';
import BeverageItem from './BeverageItem';


export default class RenderRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const DATA = this.props.rowDataInput;
        return (
            <View style={{ height: 130, width: "100%", display: "flex", flexDirection: "row", marginBottom: 10, justifyContent: "center" }}>
                {
                    DATA.map((dataItem) => {
                        return (
                            <BeverageItem
                                key={dataItem.slotSetting}
                                slotSetting={dataItem.slotSetting}
                                validSlots={dataItem.validSlots}
                                name={dataItem.name}
                                price={dataItem.price}
                                imageSource={dataItem.imageSource}
                            />
                        )
                    })
                }
            </View>
        )
    }
}





