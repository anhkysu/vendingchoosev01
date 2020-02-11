import React, {Component} from 'react';
import {ScrollView, View, Text, Image, Button, Alert} from 'react-native';

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

class PaymentSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: 'content://media/external/images/media/47',
      isNew: true,
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

  giveCash(){
    Alert.alert('Thông báo', 'Đã lấy hết tiền từ ngăn thối!')
  }

  getCash() {
    Alert.alert('Thông báo', 'Mời bạn nhận tiền từ ngăn thối!', [{
      text: 'Hủy',
      onPress: () => {
        clearTimeout(this.getCashTimeout);
      },
    }]);
  }

  handleGetCash() {
    var a = this;
    Alert.alert('Thông báo', 'Bạn muốn lấy tiền từ ngăn thối?', [
      {
        text: 'Yes',
        onPress: () => {
          this.getCash();
          this.getCashTimeout =  setTimeout(()=>{
            this.giveCash();
          }, 3000);
        },
      },
      {
        text: 'No',
        onPress: () => {
          Alert.alert('Thông báo', 'Fine');
        },
      },
    ]);
  }

  handleInputCash() {
    //Alert.alert('Thông báo', 'Số tờ tiền ngăn thối hiện có: 3 tờ');
    this.props.navigation.navigate('PushCashSetting');
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
        <View style={{flex: 1, marginBottom: 10}}>
          <ScrollView style={{flex: 1}}>
            {this.props.paymentSettings.map((datainput, index) => {
              return (
                <DataInputItem
                  key={index}
                  parentDataKey={'paymentSettings'}
                  itemlabel={datainput.itemlabel}
                  datainputtype={datainput.datainputtype}
                  defaultvalue={datainput.datainput}
                  pickeroptions={datainput.options}
                  constraint={datainput.constraint}
                />
              );
            })}
          </ScrollView>
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
            <Button
              title="Nạp Tiền Thối"
              onPress={() => {
                this.handleInputCash();
              }}
            />
          </View>
          <View style={{paddingRight: 10}}>
            <Button
              title="Lấy Tiền Thối"
              onPress={() => {
                this.handleGetCash();
              }}
            />
          </View>
          <View style={{paddingRight: 10}}>
            <Button title="Reset Tiền" />
          </View>
          <View style={{paddingRight: 10}}>
            <Button title="Lưu thông tin" />
          </View>
        </View>
      </View>
    );
  }

  componentDidMount() {}
}

function mapStateToProps(state) {
  return {
    settingdatalist: state.settingdatalist,
    currentslotsetting: state.currentslotsetting,
    paymentSettings: state.paymentSettings,
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSettings);
