/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Picker,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { gray } from 'ansi-colors';

function RenderRow ({height, idNumber}){
  return (
    <View style={{width: "100%", height: 60, display: "flex", flexDirection: "row"}}>
        <View style={{width:60, backgroundColor: "#e8effd", margin: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Text>{idNumber}</Text>
        </View> 
        <View style={{flex:1, backgroundColor: "#e8effd", margin: 1, padding:2, paddingHorizontal: 20, display: "flex", justifyContent: "center"}}>
            <TextInput 
                style={{height:40, width: "100%", backgroundColor: "white"}}
            />
        </View>
        <View style={{width:120, backgroundColor: "#e8effd", margin: 1, padding:2, paddingHorizontal: 20, display: "flex", justifyContent: "center"}}>
            <TextInput 
                style={{height:40, width: "100%", backgroundColor: "white"}}
            />
        </View>
        <View style={{width:200, backgroundColor: "#e8effd", margin: 1, padding:2, paddingHorizontal: 20, display: "flex", justifyContent: "center"}}>
            <TextInput 
                style={{height:40, width: "100%", backgroundColor: "white"}}
            />
        </View>
    </View>
  )
}

const App: () => React$Node = () => {
  const data = [{id:"1"},{id:"2"},{id:"3"},{id:"4"},{id:"5"},{id:"6"},{id:"7"}];
  return (
    <View style={{flex:1}}>
      <View style={{height:40, alignItems: "flex-start", justifyContent: "center", paddingLeft: 20}}>
          <Text style={{fontWeight:"bold", fontSize: 19}}>SETTING PAGE</Text>
      </View>

      <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 10, borderWidth: 1, borderColor: "#3e81f4", borderRadius: 3 }}>
        <View style={{ width: "100%", height: 20, display: "flex", flexDirection: "row" }}>
          <View style={{ width: 60, backgroundColor: "#d0e0fb", margin: 1 , display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Text>SLOT</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "#d0e0fb", margin: 1 , display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Text>TÊN NƯỚC</Text>
          </View>
          <View style={{ width: 120, backgroundColor: "#d0e0fb", margin: 1 , display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Text>SỐ LƯỢNG</Text>
          </View>
          <View style={{ width: 200, backgroundColor: "#d0e0fb", margin: 1 , display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Text>GIÁ TIỀN</Text>
          </View>
        </View>
        <ScrollView>
        {
          data.map((datanum) => { return (<RenderRow key={datanum.id} idNumber={datanum.id} />) })
        }
        </ScrollView>
      </View>


      <View style={{ height: 50, width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
        <View style={{ width: 200, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
          <Button title="Quay lại Home" />

        </View>
        <View style={{ flex: 1, height: "100%",justifyContent: "center", alignItems: "center" }}>
          
            <Button title="Quay về Settings" />
          
        </View>
        <View style={{ width: 200, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
          <Button title="Lưu thay đổi" />
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
