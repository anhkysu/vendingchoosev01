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

class Passwords extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <View >
              <DataInputItem
                parentDataKey={'passwords'}
                itemlabel="Cập nhật thông tin tài khoản"
                datainputtype="Switch"
                defaultvalue={true}
              />
            </View>
            <View>
              {this.props.passwords.map((datainput, index) => {
                return (
                  <DataInputItem
                    key={index}
                    parentDataKey={'passwords'}
                    itemlabel={datainput.itemlabel}
                    datainputtype={datainput.datainputtype}
                    defaultvalue={datainput.datainput}
                    pickeroptions={datainput.options}
                    constraint={datainput.constraint}
                  />
                );
              })}
            </View>
            <View >
              <DataInputItem
                parentDataKey={'passwords'}
                itemlabel="Tạo tài khoản"
                datainputtype="Switch"
                defaultvalue={true}
              />
            </View>
            <View>
              {this.props.passwords.map((datainput, index) => {
                return (
                  <DataInputItem
                    key={index}
                    parentDataKey={'passwords'}
                    itemlabel={datainput.itemlabel}
                    datainputtype={datainput.datainputtype}
                    defaultvalue={datainput.datainput}
                    pickeroptions={datainput.options}
                    constraint={datainput.constraint}
                  />
                );
              })}
            </View>
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
            <Button title="Cập nhật thông tin" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Passwords);
