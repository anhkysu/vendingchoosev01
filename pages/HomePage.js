import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import RenderRow from "../components/RenderRow";
import myBeverageDataInput1 from "../data/beverageDataInput1";
import PageButtonItem from "../components/PageButtonItem";
import {connect} from 'react-redux';

var exampleData = [
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
  {
    slotSetting: "5",
    validSlots: "6",
    name: "Trà Bí Đao Wonder",
    price: "10000",
    imageSource: "http://www.fujimart.vn/image/cache/catalog/%C4%90%E1%BB%93%20u%E1%BB%91ng/IMG_0624-502x502.png"
  },
  {
    slotSetting: "6",
    validSlots: "6",
    name: "Bò Húc",
    price: "10000",
    imageSource: "https://i.ibb.co/svNhV97/bohuc.png"
  },
  {
    slotSetting: "7",
    validSlots: "6",
    name: "Bò Húc",
    price: "10000",
    imageSource: "https://i.ibb.co/svNhV97/bohuc.png"
  },
  {
    slotSetting: "8",
    validSlots: "6",
    name: "Bò Húc",
    price: "10000",
    imageSource: "https://i.ibb.co/svNhV97/bohuc.png"
  },
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberofslot: 60,
      numberofcolumns: 4,
      minbeverageitemwidth: 50,
      minbeverageitemheight: 130,
      numberofpages: 1,
      numberofpages_fakearray: [{ id: "1" }],
      importantdata: []
    }
  }

  findMaxNumberOfCol() {
    const minbeverageitemwidth = 150 + 10;
    var screenwidth = Dimensions.get('window').width;
    var availablewidthforrow = screenwidth - 40;
    var maxnumberofcol = Math.floor(availablewidthforrow / minbeverageitemwidth);
    return maxnumberofcol;
  }

  findMaxNumberOfRow() {
    const mincolheight = 130 + 10;
    var screenheight = Dimensions.get('window').height;
    var availableheight = screenheight - 20;
    var maxnumberofrow = Math.floor(availableheight / mincolheight);
    return maxnumberofrow;
  }

  findLayoutArrangementInfo(noofcol, noofslot) {
    const maxnumberofcol = this.findMaxNumberOfCol();
    const maxnumberofrow = this.findMaxNumberOfRow();
    if (noofcol > maxnumberofcol) {
      Alert.alert("Error", `Due to screen width constraint, the maximum number of column is ${maxnumberofcol}`);
      return;
    }
    var noofpages = Math.ceil(noofslot / (maxnumberofrow * noofcol));

    this.setState({ numberofpages: noofpages });
    setTimeout(() => { this.createFakeArray(this.state.numberofpages) }, 1);
    return noofpages;
  }

  createFakeArray(numberofpages) {
    var myArray1 = [];
    setTimeout(() => {
      for (var i = 1; i <= this.state.numberofpages; i++) {
        myArray1.push({ id: `${i}` });
      };
      this.setState({ numberofpages_fakearray: myArray1 });
    }, 1);
  }

  processFullData(noofcol, noofslot, data, pagenumber) {
    var noofpages = this.findLayoutArrangementInfo(noofcol, noofslot);
    var noofrow = Math.ceil(noofslot / (noofpages * noofcol));
    console.log(noofrow);
    var count = 1;
    if (pagenumber > 1) {
      count = count + noofrow * noofcol;
    }
    var processedData = [];

    for (var i = 1; i <= noofrow; i++) {
      processedData.push({
        rowid: `${i}`,
        rowdata: [],
      });
      for (var c = 1; c <= noofcol; c++) {
        processedData[i - 1].rowdata.push(data[count - 1]);
        count = count + 1;
        if (count > data.length) { break; }
      }
      if (i == noofrow) {
        console.log(processedData);
        this.setState({ importantdata: processedData });
      }
      if (count > data.length) { break; }
    }
  }

  componentDidMount() {
    this.processFullData(2, 8, exampleData, 1);
    console.log(this.props.settingdatalist);
  }

  render() {
    return (
      <View style={{ display: "flex", flex: 1 }}>
        <View style={{ height: 40, alignItems: "flex-start", justifyContent: "center", paddingLeft: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 19, color: "#3e81f4" }}>WELCOME TO ICOCO</Text>
        </View>

        <View style={{ display: "flex", flex: 1, padding: 5 }}>
          <View style={{ display: "flex", flex: 1, flexDirection: "column", paddingHorizontal: 10, marginVertical: 5 }}>
            {
              this.state.importantdata.map((dataItem) => {
                return (
                  <RenderRow
                    key={dataItem.rowid}
                    rowDataInput={dataItem.rowdata}
                  />
                )
              })
            }
          </View>

        </View>
        <View style={{ height: 50, width: "100%", backgroundColor: "lightblue", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "row" }}>
          <View style={{ width: 150, height: "100%", backgroundColor: "lightblue", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingLeft: 10 }}>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { }}>
              <Icon
                size={40}
                name="md-help-circle"
                color="#3e81f4"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { this.props.navigation.navigate('LoginPage') }}>
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
                {
                  this.state.numberofpages_fakearray.map((pageArray) => {
                    return (
                      <TouchableOpacity key={pageArray.id} onPress={(index) => { this.processFullData(2, 8, exampleData, pageArray.id) }}>
                        <PageButtonItem pagenumber={pageArray.id} />
                      </TouchableOpacity>
                    )
                  })
                }
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
            <Button title="Hủy Giao Dịch" />
          </View>
        </View>
      </View>
    );
  }

};

function mapStateToProps(state){
  return {
    settingdatalist: state.settingdatalist
  }
}

function mapDispatchToProps(dispatch){
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);