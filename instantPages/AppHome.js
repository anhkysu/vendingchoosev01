

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Button,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { isFlowDeclaration } from '@babel/types';

import Icon from "react-native-vector-icons/Ionicons";

const DATA = [
  {
    slotSetting: "1",
    validSlots: "2",
    name: "Coca Cola",
    price: "10000",
    imageSource: "https://truwena.co.za/wp-content/uploads/2019/01/coca-cola-can.png"
  },
  {
    slotSetting: "2",
    validSlots: "5",
    name: "Trà Xanh Không Độ",
    price: "10000",
    imageSource: "https://sieuthitt.com/images/stories/virtuemart/product/Tr___xanh_kh__ng_543a3bd0566d0.png"
  },
  {
    slotSetting: "3",
    validSlots: "6",
    name: "Trà Bí Đao Wonder",
    price: "10000",
    imageSource: "http://www.fujimart.vn/image/cache/catalog/%C4%90%E1%BB%93%20u%E1%BB%91ng/IMG_0624-502x502.png"
  },
  {
    slotSetting: "4",
    validSlots: "6",
    name: "Bò Húc",
    price: "10000",
    imageSource: "https://i.ibb.co/svNhV97/bohuc.png"
  },
]


function Item({ slotSetting, validSlots, name, price, imageSource }) {
  var screenWidth = Dimensions.get('window').width;
  return (
    <View style={{ backgroundColor: "#d0e0fb", marginHorizontal: 5, display: "flex", width:150, height: "100%", borderRadius: 7 }}>
      <TouchableOpacity style={{flex:1}}>
        <View style={{ display: "flex", flex: 1 }}>
          <View style={{ height: 20, display: "flex", flexDirection: "row", paddingHorizontal: 5, marginTop: 5}}>
              <View style={{flex:1}}>
                <Text style={{fontWeight:"bold"}}>{slotSetting}</Text>
              </View>
              <View style={{flex:1, backgroundColor:"whitesmoke", paddingRight: 7}}>
                <Text style={{textAlign:"right"}}>Còn: {validSlots}</Text>
              </View>
          </View>

          <View style={{ flex: 1, alignItems: "center", justifyContent:"center"}}>
              <Image 
                  style={{height:50, width:70}}
                  source={{uri:`${imageSource}`}}
                  resizeMode="contain"
              />
          </View>

          <View style={{ height: 20, display: "flex", alignItems: "center" }}>
                <Text style={{color:"#3e81f4", fontWeight:"bold"}}>{name}</Text>
          </View>
          <View style={{ height: 20, display: "flex", alignItems: "center" }}>
                <Text style={{color:"green"}}>{price} VND</Text>
          </View>
        </View>

      </TouchableOpacity>
    </View>
  )
}

function RenderRow ({idNumber}) {
  return (
    <View style={{height: 130, width: "100%", display: "flex", flexDirection: "row", marginBottom: 10, justifyContent:"center"}}>
        {
          DATA.map((dataItem)=>{return (
            <Item
              key={dataItem.slotSetting}
              slotSetting={dataItem.slotSetting}
              validSlots={dataItem.validSlots}
              name={dataItem.name}
              price={dataItem.price}
              imageSource={dataItem.imageSource}
            />
          )})
        }
    </View>
  )
}


const App: () => React$Node = () => {
  const data1 = [{id:"1"},{id:"2"}];
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <View style={{height:40, alignItems: "flex-start", justifyContent: "center", paddingLeft: 20}}>
          <Text style={{fontWeight:"bold", fontSize: 19, color:"#3e81f4"}}>WELCOME TO ICOCO</Text>
      </View>

      <View style={{ display: "flex", flex: 1, padding: 5 }}>
        <View style={{ display: "flex", flex: 1, flexDirection: "column", paddingHorizontal: 10, marginVertical: 5 }}>
          {
            data1.map((dataItem)=>{return (
              <RenderRow
                key={dataItem.id}
              />
            )})
          }
        </View>
        
        

      </View>
      <View style={{ height: 50, width: "100%", backgroundColor: "lightblue", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row" }}>
        <View style={{ width: 150, height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"flex-start", paddingLeft: 10 }}>
          <TouchableOpacity style={{marginRight:15}}>
            <Icon
              size={40}
              name="md-help-circle"
              color="#3e81f4"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight:15}}>
            <Icon
              size={40}
              name="md-settings"
              color="#3e81f4"
            />
          </TouchableOpacity> 
        </View>
        
        <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
          <View style={{ height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row" }}>

            <View style={{ width: 45, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity>
                <Icon
                  size={40}
                  name="ios-arrow-back"
                  color="#3e81f4"
                />
              </TouchableOpacity>
            </View>

            <View style={{ display: "flex", alignItems: "center", paddingHorizontal: 10, flexDirection: "row" }}>
                <TouchableOpacity style={{padding:5, marginHorizontal: 5, borderRadius: 10, backgroundColor: "white", width: 30}}>
                    <Text style={{fontSize:18, textAlign: "center"}}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5, marginHorizontal: 5, borderRadius: 10, backgroundColor: "white", width: 30}}>
                    <Text style={{fontSize:18, textAlign: "center"}}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:5, marginHorizontal: 5, borderRadius: 10, backgroundColor: "white", width: 30}}>
                    <Text style={{fontSize:18, textAlign: "center"}}>3</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: 45, height: "100%", alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity>
                <Icon
                  size={40}
                  name="ios-arrow-forward"
                  color="#3e81f4"
                />
              </TouchableOpacity>
              
            </View>

          </View>
        </View>

        <View style={{ width: 150, height: "100%", backgroundColor: "lightblue", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
            <Button title="Hủy Giao Dịch"/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
});

export default App;
