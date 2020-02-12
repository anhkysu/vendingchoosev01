import React, {Component} from 'react';
import {
  Picker,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert,
} from 'react-native';
import DataInputItem from '../../components/DataInputItem';
import {connect} from 'react-redux';
import {
  changeCoupleInputNew,
  createBeverageItem,
  saveBeverageInfoChanges,
} from '../../redux/actions';

class SubSlotsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: 'content://media/external/images/media/47',
      isNew: true,
    };
    this.defaultSlotObject =
      this.props.navigation.state.params.slotObject || {};
  }

  goBack(data) {
    this.props.navigation.goBack();
    this.props.navigation.state.params.onReturn(data);
  }

  changeReduxData(parentKey, label, data) {
    this.props.changeCoupleInputNew('oneslotdata', label, data);
  }

  saveBeverageItemData() {
    this.props.saveBeverageInfoChanges(
      this.defaultSlotObject.slotSetting,
      this.defaultSlotObject.name,
      this.props.slotsManagement[1].datainput,
      this.props.slotsManagement[2].datainput,
      this.defaultSlotObject.image,
      this.defaultSlotObject.uid,
      this.props.slotsManagement[0].datainput[0],
      this.props.slotsManagement[0].datainput[1],
    );
    Alert.alert('Notification', 'New changes was saved succesfully');
    this.goBack('new');
  }

  initializeNewProduct() {
    if (this.defaultSlotObject == {}) return;
    this.props.changeCoupleInputNew(
      'slotsManagement',
      'Vị trí slot',
      [this.defaultSlotObject.from,this.defaultSlotObject.to]
    );

    this.props.changeCoupleInputNew(
      'slotsManagement',
      'Giá sản phẩm',
      this.defaultSlotObject.price,
    );
    this.props.changeCoupleInputNew(
      'slotsManagement',
      'Số lượng đang có',
      this.defaultSlotObject.validSlots,
    );
    this.props.changeCoupleInputNew(
      'slotsManagement',
      'Số lượng tối đa',
      '100',
    );
  }

  componentDidMount() {
    this.initializeNewProduct();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'whitesmoke',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#d0e0fb',
              margin: 10,
              borderWidth: 1,
              borderColor: '#3e81f4',
              borderRadius: 5,
              display: 'flex',
              padding: 10,
            }}>
            <ScrollView style={{flex: 1}}>
              {this.props.slotsManagement.map((datainput, index) => {
                return (
                  <DataInputItem
                    key={index}
                    parentDataKey="slotsManagement"
                    itemlabel={datainput.itemlabel}
                    datainputtype={datainput.datainputtype}
                    defaultvalue={datainput.datainput}
                    pickeroptions={datainput.options}
                  />
                );
              })}
              <View
                style={{
                  height: 500,
                  width: '100%',
                  marginTop: 5,
                  paddingTop: 20,
                  display: 'flex',
                }}>
                <View
                  style={{
                    height: 70,
                    marginBottom: 5,
                    marginLeft: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    Thông tin sản phẩm của Slot
                  </Text>
                </View>
                <View
                  style={{
                    height: 70,
                    marginBottom: 5,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <DataInputItem
                    parentDataKey="productNameCombobox"
                    itemlabel="Tên sản phẩm"
                    datainputtype="Picker"
                    defaultvalue={this.defaultSlotObject.name}
                    pickeroptions={{'Coca Cola': 'Coca Cola', Pepsi: 'Pepsi'}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginBottom: 5,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{width: 200, height: 200, backgroundColor: 'white'}}>
                    <Image
                      source={{uri: `${this.defaultSlotObject.image}`}}
                      resizeMode="contain"
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                  <View style={{height: 50, paddingTop: 20}}>
                    <Button style={{marginTop: 15}} title="Đổi sản phẩm" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 10,
            }}>
            <Button
              title="Cập nhật thông số Slot"
              onPress={() => {
                this.saveBeverageItemData();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    settingdatalist: state.settingpage1reducer.settingdatalist,
    currentslotsetting: state.settingpage1reducer.currentslotsetting,
    slotsManagement: state.settingpage1reducer.slotsManagement,
    initialbeveragestate: state.settingpage1reducer.initialbeveragestate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCoupleInputNew: (parentkey, itemlabel, datainput) =>
      dispatch(changeCoupleInputNew(parentkey, itemlabel, datainput)),
    createBeverageItem: (slotsetting, name, price, validslots, imagesource) => {
      dispatch(
        createBeverageItem(slotsetting, name, price, validslots, imagesource),
      );
    },
    saveBeverageInfoChanges: (
      slotsetting,
      name,
      price,
      validslots,
      imagesource,
      uid,
      slotFrom,
      slotTo,
    ) => {
      dispatch(
        saveBeverageInfoChanges(
          slotsetting,
          name,
          price,
          validslots,
          imagesource,
          uid,
          slotFrom,
          slotTo,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubSlotsManagement);
