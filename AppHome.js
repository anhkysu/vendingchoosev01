

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
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { isFlowDeclaration } from '@babel/types';


const DATA = [
  {
    slotSetting: "1",
    validSlots: "2",
    name: "Coca Cola",
    price: "10000",
    imageSource: "link to image"
  },
  {
    slotSetting: "2",
    validSlots: "5",
    name: "Tra Xanh Khong Do",
    price: "10000",
    imageSource: "link to image"
  },
  {
    slotSetting: "3",
    validSlots: "6",
    name: "Tra Bi Dao Hat Chia",
    price: "10000",
    imageSource: "link to image"
  },
  {
    slotSetting: "4",
    validSlots: "6",
    name: "Tra Bi Dao Hat Chia",
    price: "10000",
    imageSource: "link to image"
  },
  {
    slotSetting: "5",
    validSlots: "6",
    name: "Tra Bi Dao Hat Chia",
    price: "10000",
    imageSource: "link to image"
  },
  {
    slotSetting: "6",
    validSlots: "6",
    name: "Tra Bi Dao Hat Chia",
    price: "10000",
    imageSource: "link to image"
  },
  {
    slotSetting: "7",
    validSlots: "6",
    name: "Tra Bi Dao Hat Chia",
    price: "10000",
    imageSource: "link to image"
  },
]

function Item({ slotSetting, validSlots, name, price, imageSource }) {
  var screenWidth = Dimensions.get('window').width;
  return (
    <View style={{ backgroundColor: "orange", marginHorizontal: 5, display: "flex", flex: 1, width: ((screenWidth-(7*10+30))/7) }}>
      <TouchableOpacity style={{flex:1}}>
        <View style={{ display: "flex", flex: 1 }}>
          <View style={{ height: 20, backgroundColor: "gray", display: "flex", flexDirection: "row" }}>
              <View style={{flex:1, backgroundColor:"red"}}>
                <Text>{slotSetting}</Text>
              </View>
              <View style={{flex:1, backgroundColor:"blue"}}>
                <Text>{validSlots}</Text>
              </View>
              <View style={{flex:3, backgroundColor: "gray", overflow:"hidden"}}>
                  <Text>asdasd</Text>
              </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white" }}>{imageSource}</Text>
          </View>
          <View style={{ height: 20, backgroundColor: "gray" }}>
                <Text>{price} VND</Text>
          </View>
        </View>

      </TouchableOpacity>
    </View>
  )
}


const App: () => React$Node = () => {
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <View style={{ height: 50, backgroundColor: "gray", alignItems: "center", justifyContent: "center" }}>
        <Text>This is a customized text for page 1</Text>
      </View>

      <View style={{ display: "flex", flex: 1, padding: 5 }}>
        <View style={{ display: "flex", flex: 1, flexDirection: "row", paddingHorizontal: 10, marginVertical: 5 }}>
          <FlatList
            style={{flex:1}}
            data={DATA}
            renderItem={({ item }) => (
              <Item
                slotSetting={item.slotSetting}
                validSlots={item.validSlots}
                name={item.name}
                price={item.price}
                imageSource={item.imageSource}
              />
            )}
            keyExtractor={item => item.slotSetting}
            horizontal={true}
            showsHorizontalScrollIndicator={false}

          />
        </View>
        <View style={{ display: "flex", flex: 1, flexDirection: "row", paddingHorizontal: 10, marginVertical: 5 }}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Item
                slotSetting={item.slotSetting}
                validSlots={item.validSlots}
                name={item.name}
                price={item.price}
                imageSource={item.imageSource}
              />
            )}
            keyExtractor={item => item.slotSetting}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{ display: "flex", flex: 1, flexDirection: "row", paddingHorizontal: 10, marginVertical: 5 }}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Item
                slotSetting={item.slotSetting}
                validSlots={item.validSlots}
                name={item.name}
                price={item.price}
                imageSource={item.imageSource}
              />
            )}
            keyExtractor={item => item.slotSetting}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

      </View>
      <View style={{ height: 50, width: "100%", backgroundColor: "gray", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row" }}>
        <View style={{ width: 150, height: "100%", backgroundColor: "lightblue" }}>
          <Text>asdasd</Text>
        </View>
        
        <View style={{ flex: 1, backgroundColor: "lightpink", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: 150, height: "80%", backgroundColor: "brown" }}>
            <Text>aasdasd</Text>
          </View>
        </View>

        <View style={{ width: 150, height: "100%", backgroundColor: "lightblue" }}>
          <Text>aasdasa asdasd  asdasdad</Text>
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
