import React, {Component} from 'react';
import {ScrollView, View, Text, Image, Button, Alert, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {updateOneSlotData, saveBeverageInfoChanges} from '../../redux/actions';
import DataInputItem from '../../components/DataInputItem';
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

class GetDataSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatingUser: {
        username: '',
        passwords: '',
        passconfirm: '',
      },
      newUser: {
        username: 'a',
        passwords: 'a',
        passconfirm: 'a',
      },
      updateAccountPermission: false,
      newAccountPermission: false,
      avatarSource: ""
    };
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

  render() {
    return (
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
        <View
          style={{
            flex: 1,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
          }}>

          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Text style={{fontSize: 20, fontWeight:"bold", marginLeft: 20, marginBottom: 10}}>
                    Cài đặt thông tin sản phẩm
                </Text>
              {this.props.newProductData.map((datainput, index) => {
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

          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, display: "flex"}} horizontal={true}>
              {
                  this.props.initialbeveragestate.map((item, index)=>{
                      return (
                        <TouchableOpacity  key={index}>
                        <View style={{ margin: 12, padding:10, backgroundColor: "whitesmoke",borderWidth: 1, borderColor: "dodgerblue", borderRadius: 10, display: "flex", alignItems:"center",  justifyContent:"center",}}>
                            <Text style={{fontSize:18,}}>
                                Vị trí: {item.slotsetting}
                            </Text>
                            <Text style={{fontSize:18,}}>
                                Tên: {item.name}
                            </Text>
                            <Text style={{fontSize:18,}}>
                                Giá: {item.price} VND
                            </Text>
                        </View>
                        </TouchableOpacity>
                      );
                  })
              }
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            height: 40,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingVertical: 2,
          }}>
          <View style={{paddingRight: 10}}>
            <Button title="Quay lại" onPress={() => {this.props.navigation.goBack(null)}} />
          </View>
          <View style={{paddingRight: 10}}>
            <Button title="Tiếp tục" onPress={() => {}} />
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {}
}

function mapStateToProps(state) {
  return {
    passwords: state.passwords,
    newProductData: state.newProductData,
    initialbeveragestate: state.initialbeveragestate
  };
}

function mapDispatchToProps(dispatch) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(GetDataSettings);
