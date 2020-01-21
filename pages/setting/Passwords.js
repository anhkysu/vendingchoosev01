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
    };
  }

  handleUpdateUser(data) {
    this.setState({updateAccountPermission: data});
  }

  handleNewAccount(data) {
    this.setState({newAccountPermission: data});
  }

  handleInfoChange(myCase, label, data) {
    var info = (myCase=="newUser" ? this.state.newUser : this.state.updatingUser);
    switch (label) {
      case 'username':
        info = {...info, username: data};
        break;
      case 'passwords':
        info = {...info, passwords: data};
        break;
      case 'passconfirm':
        info = {...info, passconfirm: data};
        break;
    }

    this.setState({[myCase]:info});
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
            <View>
              <DataInputItem
                itemlabel={'Cập nhật thông tin tài khoản'}
                datainputtype={'CustomFunctionSwitch'}
                defaultvalue={this.state.updateAccountPermission}
                customFunction={data => {
                  this.handleUpdateUser(data);
                }}
              />
            </View>
            <View>
              {this.state.updateAccountPermission && (
                <>
                  <DataInputItem
                    itemlabel={'Tên tài khoản'}
                    datainputtype={'CustomFunctionTextInput'}
                    defaultvalue={this.state.updatingUser.username}
                    customFunction={data => {
                      this.handleInfoChange('updatingUser', 'username', data);
                    }}
                  />
                  <DataInputItem
                    itemlabel={'Mật khẩu'}
                    datainputtype={'CustomFunctionTextInput'}
                    defaultvalue={this.state.updatingUser.passwords}
                    customFunction={data => {
                      this.handleInfoChange('updatingUser', 'passwords', data);
                    }}
                  />
                  <DataInputItem
                    itemlabel={'Xác nhận mật khẩu'}
                    datainputtype={'CustomFunctionTextInput'}
                    defaultvalue={this.state.updatingUser.passconfirm}
                    customFunction={data => {
                      this.handleInfoChange('updatingUser', 'passconfirm', data);
                    }}
                  />
                </>
              )}
            </View>
            <View>
              <DataInputItem
                itemlabel={'Tạo tài khoản'}
                datainputtype={'CustomFunctionSwitch'}
                defaultvalue={this.state.newAccountPermission}
                customFunction={data => {
                  this.handleNewAccount(data);
                }}
              />
            </View>
            <View>
              {this.state.newAccountPermission && (
                <>
                  <DataInputItem
                    itemlabel={'Tên tài khoản'}
                    datainputtype={'CustomFunctionTextInput'}
                    defaultvalue={this.state.newUser.username}
                    customFunction={data => {
                      this.handleInfoChange('newUser', 'username', data);
                    }}
                  />
                  <DataInputItem
                    itemlabel={'Mật khẩu'}
                    datainputtype={'CustomFunctionTextInput'}
                    defaultvalue={this.state.newUser.passwords}
                    customFunction={data => {
                      this.handleInfoChange('newUser', 'passwords', data);
                    }}
                  />
                  <DataInputItem
                    itemlabel={'Xác nhận mật khẩu'}
                    datainputtype={'CustomFunctionTextInput'}
                    defaultvalue={this.state.newUser.passconfirm}
                    customFunction={data => {
                      this.handleInfoChange('newUser', 'passconfirm', data);
                    }}
                  />
                </>
              )}
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
            <Button title="Cập nhật thông tin" onPress={()=>{console.log(this.state.updatingUser)}}/>
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
