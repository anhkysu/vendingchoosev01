import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { connect } from 'react-redux';


function RenderRow({ idNumber, name, number, price }) {
  return (
    <View style={{ width: "100%", height: 60, display: "flex", flexDirection: "row" }}>
      <View style={{ width: 60, backgroundColor: "#e8effd", margin: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Text>{idNumber}</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "#e8effd", margin: 1, padding: 2, paddingHorizontal: 20, display: "flex", justifyContent: "center" }}>
        <TextInput
          style={{ height: 40, width: "100%", backgroundColor: "white" }}
          value = {name}
        />
      </View>
      <View style={{ width: 120, backgroundColor: "#e8effd", margin: 1, padding: 2, paddingHorizontal: 20, display: "flex", justifyContent: "center" }}>
        <TextInput
          style={{ height: 40, width: "100%", backgroundColor: "white" }}
          value = {number}
        />
      </View>
      <View style={{ width: 200, backgroundColor: "#e8effd", margin: 1, padding: 2, paddingHorizontal: 20, display: "flex", justifyContent: "center" }}>
        <TextInput
          style={{ height: 40, width: "100%", backgroundColor: "white" }}
          value = {price}
        />
      </View>
    </View>
  )
}

class SettingPage2 extends Component {

  render() {
    const data = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }];
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginHorizontal: 10, marginBottom: 10, borderWidth: 1, borderColor: "#3e81f4", borderRadius: 3 }}>
          <View style={{ width: "100%", height: 20, display: "flex", flexDirection: "row" }}>
            <View style={{ width: 60, backgroundColor: "#d0e0fb", margin: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Text>SLOT</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#d0e0fb", margin: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Text>TÊN NƯỚC</Text>
            </View>
            <View style={{ width: 120, backgroundColor: "#d0e0fb", margin: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Text>SỐ LƯỢNG</Text>
            </View>
            <View style={{ width: 200, backgroundColor: "#d0e0fb", margin: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Text>GIÁ TIỀN</Text>
            </View>
          </View>
          <ScrollView>
            {
              this.props.initialbeveragestate.map((dataitem) => { return (<RenderRow key={dataitem.slotsetting} idNumber={dataitem.slotsetting} name={dataitem.name} number={dataitem.validslots} price={dataitem.price} />)})
            }
          </ScrollView>
        </View>

        <View style={{ height: 50, width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
          <View style={{ width: 200, height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
            <Button title="Quay lại Home" onPress={()=>{this.props.navigation.navigate("Home")}}/>
          </View>
          <View style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
            
          </View>
          <View style={{ width: 200, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
            <Button title="Lưu thay đổi" onPress={()=>{console.log(this.props.settingdatalist)}}/>
          </View>
        </View>
      </View>
    );
  }

};

function mapStateToProps(state) {
	return {
    settingdatalist: state.settingdatalist,
    noofcol: state.noofcol,
    initialbeveragestate: state.initialbeveragestate,
	}
}
const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage2);

