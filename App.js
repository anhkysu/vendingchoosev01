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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { gray } from 'ansi-colors';

const App: () => React$Node = () => {
  return (
    <View style={{flex:1}}>
      <View style={{height:50, backgroundColor: "gray", alignItems: "center", justifyContent: "center"}}>
          <Text>This is a customized text for page 1</Text>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 2, backgroundColor: "whitesmoke" }}>
          <ScrollView>
            <View style={{ height: 30, width: "90%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
              <View style={{ flex: 1, backgroundColor: "steelblue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                <Text>Số lượng slot</Text>
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{ borderWidth: 2, borderColor: "black" }}
                />
              </View>
            </View>

            <View style={{ height: 30, width: "90%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
              <View style={{ flex: 1, backgroundColor: "steelblue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                <Text>Số cột hiển thị</Text>
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{ borderWidth: 2, borderColor: "black" }}
                />
              </View>
            </View>

            <View style={{ height: 30, width: "90%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
              <View style={{ flex: 1, backgroundColor: "steelblue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow:"hidden" }}>
                <Text numberOfLines={1}>Thời gian chuyển trang</Text>
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{ borderWidth: 2, borderColor: "black" }}
                />
              </View>
            </View>

            <View style={{ height: 30, width: "90%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
              <View style={{ flex: 1, backgroundColor: "steelblue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                <Text numberOfLines={1}>COM</Text>
              </View>
              <View style={{ flex: 1, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                <Picker
                  selectedValue={"java"}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    {}
                  }>
                  <Picker.Item label="COM1" value="java" />
                  <Picker.Item label="COM2" value="js" />
                </Picker>
              </View>
            </View>

            <View style={{ height: 30, width: "90%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
              <View style={{ flex: 1, backgroundColor: "steelblue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                <Text numberOfLines={1}>Baudrate</Text>
              </View>
              <View style={{ flex: 1, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                <Picker
                  selectedValue={"java"}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    {}
                  }>
                  <Picker.Item label="115200" value="java" />
                  <Picker.Item label="62500" value="js" />
                </Picker>
              </View>
            </View>

            <View style={{ height: 30, width: "90%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
              <View style={{ flex: 1, backgroundColor: "steelblue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                <Text numberOfLines={1}>Databits</Text>
              </View>
              <View style={{ flex: 1, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                <Picker
                  selectedValue={"java"}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    {}
                  }>
                  <Picker.Item label="8" value="8" />
                  <Picker.Item label="16" value="16" />
                </Picker>
              </View>
            </View>

            <View style={{ height: 30, width: "90%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
              <View style={{ flex: 1, backgroundColor: "steelblue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                <Text numberOfLines={1}>Parity</Text>
              </View>
              <View style={{ flex: 1, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                <Picker
                  selectedValue={"java"}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    {}
                  }>
                  <Picker.Item label="None" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>
            </View>

            <View style={{ height: 30, width: "90%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "row", marginVertical: 3 }}>
              <View style={{ flex: 1, backgroundColor: "steelblue", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
                <Text numberOfLines={1}>Stopbit</Text>
              </View>
              <View style={{ flex: 1, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                <Picker
                  selectedValue={"java"}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    {}
                  }>
                  <Picker.Item label="One" value="java" />
                  <Picker.Item label="Two" value="js" />
                </Picker>
              </View>
            </View>

          </ScrollView>
        </View>

        <View style={{ flex: 3, backgroundColor: "steelblue" }}>

        </View>
      </View>


      <View style={{height:50, width:"100%",backgroundColor: "gray", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
          <View style={{width:150, height: "100%", backgroundColor: "lightblue"}}>
              <Text>asdasd</Text>
          </View>
          <View style={{flex:1, backgroundColor:"lightpink", height: "100%", justifyContent:"center", alignItems: "center"}}>
              <View style={{width: 150, height: "80%", backgroundColor: "brown"}}>
                  <Text>aasdasd</Text>
              </View>
          </View>
          <View style={{width: 150, height: "100%",backgroundColor: "lightblue"}}>
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
