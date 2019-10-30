

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
  TextInput,
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





const App: () => React$Node = () => {
  const data1 = [{id:"1"},{id:"2"}];
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <View style={{height:40, alignItems: "flex-start", justifyContent: "center", paddingLeft: 20}}>
          <Text style={{fontWeight:"bold", fontSize: 19}}>AUTHORIZATION PAGE</Text>
      </View>

      <View style={{ display: "flex", flex: 1, padding: 5, alignItems: "center", justifyContent:"center" }}>
        <View style={{ width: "60%", minWidth: 300, height: "auto",display: "flex", flexDirection: "column", paddingHorizontal: 10, marginVertical: 5}}>
          <View style={{ width: "100%", height: 40, marginBottom: 5, display: "flex", flexDirection: "row" }}>
            <View style={{ width: 90, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
              <Text style={{fontWeight:"bold", fontSize: 16}}>Username</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
              />
            </View>
          </View>

          <View style={{ width: "100%", height: 40, marginBottom: 5, display: "flex", flexDirection: "row" }}>
            <View style={{ width: 90, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Passwords</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TextInput
                style={{ height: 40, borderRadius: 3, borderWidth: 0.5, borderColor: "gray", backgroundColor: "white" }}
              />
            </View>
          </View>

            <View style={{width: "100%", height: 40, marginTop: 10}}>
                <Button title="SIGN IN"/>
            </View>
        </View>

        
        

      </View>
      <View style={{ height: 50, width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
        <View style={{ width: 200, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
          <Button title="Quay lại Home" />

        </View>
        <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>

          <View style={{ width: 200, height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
            
          </View>

        </View>
        <View style={{ width: 200, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
          
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
