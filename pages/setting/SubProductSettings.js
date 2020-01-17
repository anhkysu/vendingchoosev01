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
import {changeCoupleInputNew, saveBeverageInfoChanges, createBeverageItem} from '../../redux/actions';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  allowsEditing: false,
};

class SubProductSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: 'content://media/external/images/media/47',
      isNew: true,
    };
    this.defaultItemObject =
      this.props.navigation.state.params.itemObject || 'new';
  }

  goBack(data) {
    this.props.navigation.goBack();
    this.props.navigation.state.params.onReturn(data);
  }

  createBeverageItemData(
    slotsetting,
    name,
    price,
    validslots,
    imagesource,
    uid,
  ) {
    this.props.createBeverageItem(
      slotsetting,
      name,
      price,
      validslots,
      imagesource,
      uid,
    );
    Alert.alert('Notification', 'New changes was saved succesfully');
  }

  handleImagePicker() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response oriURL = ', response.uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  changeReduxData(parentKey, label, data) {
    this.props.changeCoupleInputNew('oneslotdata', label, data);
  }

  initializeNewProduct() {
    var currentNumberOfProduct = this.props.initialbeveragestate.length;
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'Slot Setting',
      String(currentNumberOfProduct + 1),
    );
    this.props.changeCoupleInputNew('oneslotdata', 'Tên Nước', 'Nhập tên nước');
  }

  loadProduct() {
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'Slot Setting',
      this.defaultItemObject.slotSetting,
    );
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'Tên Nước',
      this.defaultItemObject.name,
    );
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'Giá Tiền',
      this.defaultItemObject.price,
    );
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'Số Lượng',
      this.defaultItemObject.validSlots,
    );
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'UID',
      this.defaultItemObject.uid,
    );
    this.setState({avatarSource: this.defaultItemObject.image});
  }

  onCreateNewProduct() {
    var data = this.props.oneslotdata;
    this.createBeverageItemData(
      data[0].datainput,
      data[1].datainput,
      data[2].datainput,
      data[3].datainput,
      this.state.imagesource,
      data[4].datainput,
    );
    this.goBack('new');
  }

  onUpdateProduct() {
    var data = this.props.oneslotdata;
    this.props.saveBeverageInfoChanges(
      data[0].datainput,
      data[1].datainput,
      data[2].datainput,
      data[3].datainput,
      this.state.avatarSource,
      data[4].datainput,
    );
    Alert.alert('Notification', 'New changes was saved succesfully');
    this.goBack('new');
  }

  componentDidMount() {
    if (this.defaultItemObject == 'new') {
      this.initializeNewProduct();
    } else {
      this.loadProduct();
    }
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
              {this.props.oneslotdata.map((datainput, index) => {
                return (
                  <DataInputItem
                    key={index}
                    parentDataKey="oneslotdata"
                    itemlabel={datainput.itemlabel}
                    datainputtype={datainput.datainputtype}
                    defaultvalue={datainput.datainput}
                    pickeroptions={datainput.options}
                  />
                );
              })}
              <View
                style={{
                  height: 300,
                  width: '100%',
                  marginTop: 5,
                  display: 'flex',
                }}>
                <View
                  style={{
                    height: 40,
                    width: 300,
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 5,
                    marginLeft: 15,
                  }}>
                  <Text style={{fontSize: 17}}>Chọn hình hiển thị</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'whitesmoke',
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '5%',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: 15,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: 200,
                        height: 200,
                        backgroundColor: 'white',
                      }}>
                      <Image
                        style={{
                          height: '100%',
                          width: 'auto',
                          backgroundColor: 'transparent',
                        }}
                        source={{uri: this.state.avatarSource}}
                        resizeMode="contain"
                        overlayColor="blue"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: 70,
                      height: '100%',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      paddingBottom: 5,
                      paddingRight: 5,
                    }}>
                    <Button
                      title="Chọn"
                      onPress={() => {
                        this.handleImagePicker();
                      }}
                    />
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
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: 10,
            }}>
            {this.defaultItemObject == 'new' ? (
              <View style={{paddingRight: 10}}>
                <Button
                  title="Thêm sản phẩm"
                  onPress={() => {
                    this.onCreateNewProduct();
                  }}
                />
              </View>
            ) : (
              <>
                <View style={{paddingRight: 10}}>
                  <Button
                    title="Cập nhật thông tin"
                    onPress={() => {
                      this.onUpdateProduct();
                    }}
                  />
                </View>
                <View style={{paddingRight: 10}}>
                  <Button
                    title="Xóa sản phẩm"
                    onPress={() => {
                      this.onDeleteProduct();
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </View>
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
    changeCoupleInputNew: (parentkey, itemlabel, datainput) =>
    dispatch(changeCoupleInputNew(parentkey, itemlabel, datainput)),
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
    createBeverageItem: (
      slotsetting,
      name,
      price,
      validslots,
      imagesource,
      uid,
    ) => {
      dispatch(
        createBeverageItem(
          slotsetting,
          name,
          price,
          validslots,
          imagesource,
          uid,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubProductSettings);
