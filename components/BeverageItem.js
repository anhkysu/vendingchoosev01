import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
  } from 'react-native';


export default class BeverageItem extends Component {
    constructor(props){
        super(props);
        
    }

    haha(){
        console.log("ah");
    }

    render() {
        const slotSetting = this.props.slotSetting;
        const validSlots = this.props.validSlots;
        const name = this.props.name;
        const price = this.props.price;
        const imageSource = this.props.imageSource;
        
        return (
            <View style={{ backgroundColor: "#d0e0fb", marginHorizontal: 5, display: "flex", width: this.props.itemWidth, height: "100%", borderRadius: 7, borderWidth: 0.5, borderColor: "#3e81f4" }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>{this.props.myMethod1({slotSetting:slotSetting, validSlots:validSlots, name: name, price: price, image: imageSource})}}>
                    <View style={{ display: "flex", flex: 1 }}>
                        <View style={{ height: 20, display: "flex", flexDirection: "row", paddingHorizontal: 5, marginTop: 5 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: "bold", fontSize: this.props.itemFontSize }}>{slotSetting}</Text>
                            </View>
                            <View style={{}}>
                                <Text style={{ textAlign: "right", fontSize: this.props.itemFontSize, backgroundColor:"whitesmoke", paddingHorizontal: 15, borderRadius: 5}}>Còn: {validSlots}</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Image
                                style={{ height: this.props.itemHeight/2.5, width: this.props.itemWidth/2.5 }}
                                source={{ uri: `${imageSource}`}}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={{ minHeight:20, padding:1, display: "flex", alignItems: "center" }}>
                            <Text style={{ color: "#3e81f4", fontWeight: "bold", fontSize: this.props.itemFontSize }}>{name}</Text>
                        </View>
                        <View style={{ minHeight: 20, padding:1, display: "flex", alignItems: "center" }}>
                            <Text style={{ color: "green", fontSize: this.props.itemFontSize }}>{price} VND</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}





