import React, {Component} from 'react';
import {
  Picker,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';

import {connect} from 'react-redux';
import {updateOneSlotData, saveBeverageInfoChanges} from '../../redux/actions';
import RenderRow from '../../components/RenderRow';
import {
  findMaxNumberOfColumn,
  findMaxNumberOfRow,
  createFakeArray,
  findNextPage,
  processFullData,
  isNotZero,
} from '../layoututils';
import PageButtonItem from '../../components/PageButtonItem';
import Icon from 'react-native-vector-icons/Ionicons';

class SlotsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importantdata: [],
      numberofpages: 1,
      numberofpages_fakearray: [],
      currentpagenumber: 1,
    };
  }

  renderBeverageData(noofcol, noofslot, data, pagenumber) {
    var returnedLayout = this.initializeLayout(noofcol, noofslot);
    var numberofpages = returnedLayout.noofpages;
    var maxnumberofcol = returnedLayout.maxnumberofcol;
    var noofrow = returnedLayout.maxnumberofrow;
    var processedData = processFullData(
      maxnumberofcol,
      noofslot,
      data,
      pagenumber,
      numberofpages,
      noofrow,
    );
    this.setState({importantdata: processedData});
  }

  initializeLayout(noofcol, noofslot) {
    const maxnumberofcol = findMaxNumberOfColumn(
      Dimensions.get('window').width,
      Number(this.props.settingdatalist[3].datainput),
    );
    const maxnumberofrow = findMaxNumberOfRow(
      Dimensions.get('window').height -
        Number(this.props.settingdatalist[6].datainput) -
        Number(this.props.settingdatalist[7].datainput),
      Number(this.props.settingdatalist[4].datainput),
    );

    var noofpages = Math.ceil(this.props.initialbeveragestate.length / (maxnumberofrow * maxnumberofcol));
    this.setState({numberofpages: noofpages});
    setTimeout(() => {
      var fakearray = createFakeArray(this.state.numberofpages);
      this.setState({numberofpages_fakearray: fakearray});
    }, 1);
    return {
      noofpages: noofpages,
      maxnumberofrow: maxnumberofrow,
      maxnumberofcol: maxnumberofcol,
    };
  }

  onReturn(data) {
    if (data == 'new') {
        setTimeout(()=>{
            this.renderBeverageData(
                this.props.settingdatalist[1].datainput,
                this.props.settingdatalist[0].datainput,
                this.props.initialbeveragestate,
                this.state.currentpagenumber,
              );
        },10)
    }
  }

  onItemTouched(data) {
    this.props.navigation.navigate('SubSlotsManagement', {
      slotObject: data,
      onReturn: data => this.onReturn(data),
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            {this.state.importantdata.map(dataItem => {
              return (
                <RenderRow
                  myMethod={data => {
                    this.onItemTouched(data);
                  }}
                  key={dataItem.rowid}
                  itemStyle="slotOriented"
                  rowDataInput={dataItem.rowdata}
                  height={Number(this.props.settingdatalist[4].datainput)}
                  width={Number(this.props.settingdatalist[3].datainput)}
                  itemFontSize={Number(this.props.settingdatalist[5].datainput)}
                />
              );
            })}
          </View>

          <View
            style={{
              height: Number(this.props.settingdatalist[7].datainput),
              width: '100%',
              backgroundColor: 'lightblue',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  height: '100%',
                  backgroundColor: 'lightblue',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                {this.state.numberofpages_fakearray.map(pageArray => {
                  return (
                    <TouchableOpacity
                      disabled={pageArray.id == this.state.currentpagenumber}
                      key={pageArray.id}
                      onPress={index => {
                        this.renderBeverageData(
                          this.props.settingdatalist[1].datainput,
                          this.props.settingdatalist[0].datainput,
                          this.props.initialbeveragestate,
                          pageArray.id,
                        );
                        this.setState({currentpagenumber: pageArray.id});
                      }}>
                      <PageButtonItem
                        disabledStyle={
                          pageArray.id == this.state.currentpagenumber
                        }
                        pagenumber={pageArray.id}
                        pageNumberFontSize={
                          Number(this.props.settingdatalist[9].datainput) + 2
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: 10,
              }}>
              <View style={{paddingRight: 10}}>
                <Button
                  title="Hiển thị slot lỗi"
                  onPress={() => {
                    this.props.navigation.navigate('ErrorSlots');
                  }}
                />
              </View>
              <View style={{paddingRight: 10}}>
                <Button
                  title="Lấy dữ liệu từ server"
                  onPress={() => {
                    this.props.navigation.navigate('GetDataSettings')
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.renderBeverageData(
      this.props.settingdatalist[1].datainput,
      this.props.settingdatalist[0].datainput,
      this.props.initialbeveragestate,
      this.state.currentpagenumber,
    );
  }
}

function mapStateToProps(state) {
  return {
    settingdatalist: state.settingdatalist,
    currentslotsetting: state.currentslotsetting,
    oneslotdata: state.oneslotdata,
    initialbeveragestate: state.initialbeveragestate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateOneSlotData: data => {
      dispatch(updateOneSlotData(data));
    },
    saveBeverageInfoChanges: (
      slotsetting,
      name,
      price,
      validslots,
      imagesource,
    ) => {
      dispatch(
        saveBeverageInfoChanges(
          slotsetting,
          name,
          price,
          validslots,
          imagesource,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SlotsManagement);
