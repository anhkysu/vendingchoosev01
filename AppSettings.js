/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <View style={{flex:1}}>
      <View style={{height:50, backgroundColor: "gray", alignItems: "center", justifyContent: "center"}}>
          <Text>This is a customized text for page 1</Text>
      </View>

      <View style={{flex:1, flexDirection: "row"}}>
          <View style={{flex: 2, backgroundColor: "whitesmoke"}}>

          </View>
          <View style={{flex: 3, backgroundColor: "steelblue"}}>
              
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
