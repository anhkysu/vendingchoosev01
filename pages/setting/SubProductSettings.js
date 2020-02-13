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
  saveBeverageInfoChanges,
  createBeverageItem,
  deleteItem,
} from '../../redux/actions';
import ImagePicker from 'react-native-image-picker';
import {sendUartData} from '../../redux/actions';
import { isValidUartData, serializeUartData } from '../../communication/uartUtils';

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
      refreshTime: 1,
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
      'ID sản phẩm',
      String(currentNumberOfProduct + 1),
    );
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'Tên sản phẩm',
      'Nhập tên nước',
    );
  }

  loadProduct() {
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'Tên sản phẩm',
      this.defaultItemObject.name,
    );
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'Giá sản phẩm',
      this.defaultItemObject.price,
    );
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'ID sản phẩm',
      this.defaultItemObject.slotSetting,
    );
    this.props.changeCoupleInputNew(
      'oneslotdata',
      'UID sản phẩm',
      this.defaultItemObject.uid,
    );
    this.setState({avatarSource: this.defaultItemObject.image});
  }

  submitNewProduct() {
    var data = this.props.oneslotdata;
    this.createBeverageItemData(
      data[2].datainput,
      data[0].datainput,
      data[1].datainput,
      '0',
      this.state.avatarSource,
      data[3].datainput,
    );
    this.goBack('new');
  }

  onSubmitNewProduct(productObject) {
    if (typeof productObject !== 'object') return;
    const sendData = {
      topic: 'settingCreateProducts',
      type: 'request',
      content: productObject,
    };
    this.sendSerialData(JSON.stringify(sendData), false);
  }

  onUpdateProduct(data){
    this.updateProduct(data);
  }

  updateProduct(data) {
    this.props.saveBeverageInfoChanges(
      data[2].datainput,
      data[0].datainput,
      data[1].datainput,
      null,
      this.state.avatarSource,
      data[3].datainput,
    );
    Alert.alert('Notification', 'New changes was saved succesfully');
    this.goBack('new');
  }

  onDeleteProduct(productId){
    this.deleteProduct(productId);
  }


  deleteProduct(productId) {
    this.props.deleteItem(productId);
    Alert.alert('Notification', 'New changes was saved succesfully', [
      {
        text: 'OK',
        onPress: () => {
          this.goBack('new');
        },
      },
    ]);
  }

  sendSelectedProduct(productObject){
    const sendData = {
      topic:"settingProductsChosen",
      type:"request",
      content: productObject
    };
    this.sendSerialData(JSON.stringify(sendData), false);
  }

  componentDidMount() {
    if (this.defaultItemObject == 'new') {
      this.initializeNewProduct();
    } else {
      this.loadProduct();
      this.sendSelectedProduct(this.defaultItemObject);
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
                    this.onSubmitNewProduct(this.props.oneslotdata);
                  }}
                />
              </View>
            ) : (
              <>
                <View style={{paddingRight: 10}}>
                  <Button
                    title="Cập nhật thông tin"
                    onPress={() => {
                      this.onUpdateProduct(this.props.oneslotdata);
                    }}
                  />
                </View>
                <View style={{paddingRight: 10}}>
                  <Button
                    title="Xóa sản phẩm"
                    onPress={() => {
                      this.onDeleteProduct(this.defaultItemObject.slotSetting);
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

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.uartReceive) !==
      JSON.stringify(prevProps.uartReceive)
    ) {
      this.processUartData(this.props.uartReceive);
    }
    else if (
      JSON.stringify(this.props.uartSend) !== JSON.stringify(prevProps.uartSend)) {
      Alert.alert("Yeah", JSON.stringify(this.props.uartSend));
    }
  }

  sendSerialData(string, notStrict){
    const prevString = JSON.stringify(this.props.uartSend);
    const available = serializeUartData({currString: string, prevString, notStrict});
    if(!available) {Alert.alert("Failed", "Send uart Failed"); return}
    this.props.sendUartData(available.sendObject, available.notStrict);
  }

  processUartData(inputObject) {
    if(!isValidUartData(inputObject)) return;
    const {topic, type, content} = inputObject;
      switch(topic){
        case 'settingCreateProducts':
          if(type !== 'response') return;
          if(typeof(content.productName) == 'undefined')return;
          this.submitNewProduct();
        break;
        default:
          break;
      }
  }

}

function mapStateToProps(state) {
  return {
    uartSend: state.uart.send,
    uartReceive: state.uart.receive,
    settingdatalist: state.settingpage1reducer.settingdatalist,
    currentslotsetting: state.settingpage1reducer.currentslotsetting,
    oneslotdata: state.settingpage1reducer.oneslotdata,
    initialbeveragestate: state.settingpage1reducer.initialbeveragestate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteItem: slotsetting => dispatch(deleteItem(slotsetting)),
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
    sendUartData: (data, notStrict) => dispatch(sendUartData(data, notStrict)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubProductSettings);
