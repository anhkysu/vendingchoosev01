import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {sendUartData} from '../redux/actions';
import {connect} from 'react-redux';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwords: '',
      token: 'error',
      loading: false,
      refreshTime: 1,
    };
  }

  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  sendSerialData(string, notStrict) {
    if (!this.isJson(string)) return;
    var sendObject = JSON.parse(string);
    if (typeof sendObject !== 'object') return;

    if (string === JSON.stringify(this.props.uartSend)) {
      sendObject.refresh = this.state.refreshTime;
      this.props.sendUartData(sendObject, notStrict);
      this.setState({refreshTime: this.state.refreshTime + 1});
      return;
    }

    this.props.sendUartData(sendObject, notStrict);
    this.setState({refreshTime: 1});
  }

  authorize(username, passwords) {
    if (username === '' || passwords === '') {
      Alert.alert('CHÚ Ý', 'MỜI NHẬP ĐỦ THÔNG TIN RỒI BẤM ĐĂNG NHẬP NHÉ!');
      return;
    }
    this.sendSerialData(
      JSON.stringify({
        topic: 'loginAppSetting',
        type: 'request',
        content: {
          username: this.state.username,
          password: this.state.passwords,
        },
      }),
      false,
    );
    this.setState({loading: true});
  }

  render() {
    return (
      <View style={{display: 'flex', flex: 1}}>
        {this.state.loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              opacity: 0.3,
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!this.state.loading && (
          <View style={{display: 'flex', flex: 1}}>
            <View
              style={{
                display: 'flex',
                flex: 1,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '30%',
                  minWidth: 300,
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingHorizontal: 10,
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    marginBottom: 5,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: 90,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      overflow: 'hidden',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      Username
                    </Text>
                  </View>
                  <View style={{flex: 1, marginLeft: 10}}>
                    <TextInput
                      style={{
                        height: 40,
                        borderRadius: 3,
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        backgroundColor: 'white',
                      }}
                      onChangeText={text => {
                        this.setState({username: text});
                      }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 40,
                    marginBottom: 5,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: 90,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      overflow: 'hidden',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      Passwords
                    </Text>
                  </View>
                  <View style={{flex: 1, marginLeft: 10}}>
                    <TextInput
                      style={{
                        height: 40,
                        borderRadius: 3,
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        backgroundColor: 'white',
                      }}
                      onChangeText={pass => {
                        this.setState({passwords: pass});
                      }}
                      secureTextEntry={true}
                    />
                  </View>
                </View>

                <View style={{width: '100%', height: 40, marginTop: 10}}>
                  <Button
                    title="SIGN IN"
                    onPress={() => {
                      this.authorize(this.state.username, this.state.passwords);
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                height: 70,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 200,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingLeft: 10,
                }}>
                <Button
                  title="Quay lại Home"
                  onPress={() => {
                    this.props.navigation.navigate('Home');
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 200,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}></View>
              </View>
              <View
                style={{
                  width: 200,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingRight: 10,
                }}></View>
            </View>
          </View>
        )}
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
  }

  processUartData(inputObject) {
    var topic = inputObject.topic || 'none';
    var type = inputObject.type || 'none';
    var content = inputObject.content || 'none';
    if (topic == 'none' || content == 'none') {
      console.log('Firmware requests unrecognized!');
    } else {
      switch (topic) {
        case 'loginAppSetting':
          if (type === 'response' && content.status === 'ok') {
            this.setState({loading: false});
            this.props.navigation.navigate('SettingMenuPage');
          } else if (type === 'response' && content.status === false) {
            this.setState({loading: false});
            Alert.alert('THÔNG BÁO', 'ĐĂNG NHẬP THẤT BẠI, MỜI THỬ LẠI!');
          }
          break;
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    uartSend: state.uart.send,
    uartReceive: state.uart.receive,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendUartData: (data, notStrict) => dispatch(sendUartData(data, notStrict)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
