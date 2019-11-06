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
            <View style={{ backgroundColor: "#d0e0fb", marginHorizontal: 5, display: "flex", width: 150, height: "100%", borderRadius: 7, borderWidth: 0.5, borderColor: "#3e81f4" }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>{this.props.myMethod1(name)}}>
                    <View style={{ display: "flex", flex: 1 }}>
                        <View style={{ height: 20, display: "flex", flexDirection: "row", paddingHorizontal: 5, marginTop: 5 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: "bold" }}>{slotSetting}</Text>
                            </View>
                            <View style={{ flex: 1, backgroundColor: "whitesmoke", paddingRight: 7 }}>
                                <Text style={{ textAlign: "right" }}>Còn: {validSlots}</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Image
                                style={{ height: 40, width: 60 }}
                                source={{ uri: `${imageSource}`}}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={{ height: 20, display: "flex", alignItems: "center" }}>
                            <Text style={{ color: "#3e81f4", fontWeight: "bold" }}>{name}</Text>
                        </View>
                        <View style={{ height: 20, display: "flex", alignItems: "center" }}>
                            <Text style={{ color: "green" }}>{price} VND</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}





