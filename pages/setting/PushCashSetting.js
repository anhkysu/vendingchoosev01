import React, {Component} from 'react';
import {View, Text} from 'react-native';

class PushCashSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cashNumber: 3,
    };
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 18,
        }}>
        <Text style={{fontSize: 18}}>SỐ TIỀN NGĂN THỐI HIỆN CÓ</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontSize: 18,color: 'red'}}>{this.state.cashNumber}</Text>
          <Text style={{fontSize: 18}}> Tờ</Text>
        </View>
      </View>
    );
  }
}

export default PushCashSetting;
