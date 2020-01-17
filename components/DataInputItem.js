import React, {Component} from 'react';
import {View, Text, Picker, TextInput, Switch, Alert} from 'react-native';
import {connect} from 'react-redux';
import {
  testFunc,
  changeCoupleInput,
  changeCoupleInputNew,
  changeCurrentSlotSetting,
  changeSlotData,
} from '../redux/actions';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import processConstraint from './utils/processConstraint';

class DataInputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      defaultvalue: this.props.defaultvalue,
      pickeroptions: this.props.pickeroptions,
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked(time) {
    var hour = time.getHours();
    var min = time.getMinutes();
    var timeString =
      (hour == 0 ? '00' : hour < 10 ? `0${hour}` : hour) +
      ':' +
      (min == 0 ? '00' : min < 10 ? `0${min}` : min);
    this.changeReduxData(
      this.props.parentDataKey,
      this.props.itemlabel,
      timeString,
    );
    //this.setState({defaultvalue: date.getHours()+":"+date.getMinutes()});
    this.hideDateTimePicker();
  }

  changeReduxData(parentKey, label, data) {
    this.props.changeCoupleInputNew(parentKey, label, data);
  }

  kaka(data) {
    console.log(data);
  }

  processCoupleInput(label, data, constraint) {
    processConstraint(constraint, data, this.kaka).then(response => {
      console.log(response);
      if (response == 'valid') {
        this.changeReduxData(this.props.parentDataKey, label, data);
      } else if (response == 'invalid') {
        Alert.alert('Warning!', 'Invalid Value');
      }
    });
  }

  processNotStrictInput(label, data) {
    this.changeReduxData(this.props.parentDataKey, label, data);
  }

  onSwitch(data) {
    this.processNotStrictInput(this.props.itemlabel, data);
  }

  renderPicker() {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderColor: 'gray',
          borderRadius: 3,
        }}>
        <Picker
          selectedValue={this.props.defaultvalue}
          itemTextStyle={{fontSize: 20}}
          style={{height: 50, width: '95%'}}
          onValueChange={itemValue => {
            this.processCoupleInput(
              this.props.itemlabel,
              itemValue,
              this.props.constraint,
            );
          }}>
          {Object.keys(this.props.pickeroptions).map(key => {
            return (
              <Picker.Item
                key={key}
                label={key}
                value={this.props.pickeroptions[key]}
              />
            );
          })}
        </Picker>
      </View>
    );
  }

  renderRange() {
    return (
      <View style={{flex: 1, display:"flex", flexDirection: 'row'}}>
        <View style={{flex: 1, marginHorizontal: 3}}>
          <TextInput
            style={{
              height: 50,
              borderRadius: 3,
              borderWidth: 0.5,
              borderColor: 'gray',
              backgroundColor: 'white',
              textAlign: 'center',
              fontSize: 17,
            }}
            onChangeText={text => {
                this.processNotStrictInput(
                    this.props.itemlabel,
                    [text,this.props.defaultvalue[1]],
                  );
            }}
            value={this.props.defaultvalue[0]}
          />
        </View>
        <View style={{width: 50, height: "100%", display:"flex", alignItems: "center", justifyContent:"center"}}>
          <Text style={{fontSize: 20}}>-></Text>
        </View>
        <View style={{flex:1, marginHorizontal:3}}>
          <TextInput
            style={{
              height: 50,
              borderRadius: 3,
              borderWidth: 0.5,
              borderColor: 'gray',
              backgroundColor: 'white',
              textAlign: 'center',
              fontSize: 17,
            }}
            onChangeText={text => {
                this.processNotStrictInput(
                    this.props.itemlabel,
                    [this.props.defaultvalue[0],text],
                  );
            }}
            value={this.props.defaultvalue[1]}
          />
        </View>
      </View>
    );
  }

  renderTextInput() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          style={{
            height: 50,
            borderRadius: 3,
            borderWidth: 0.5,
            borderColor: 'gray',
            backgroundColor: 'white',
            textAlign: 'center',
            fontSize: 17,
          }}
          onChangeText={text => {
            this.processCoupleInput(
              this.props.itemlabel,
              text,
              this.props.constraint,
            );
          }}
          value={this.props.defaultvalue}
        />
      </View>
    );
  }

  renderLockedLabel() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          style={{
            height: 50,
            borderRadius: 3,
            borderWidth: 0.5,
            borderColor: 'gray',
            backgroundColor: 'white',
            textAlign: 'center',
            fontSize: 17,
          }}
          onChangeText={text => {
            this.processCoupleInput(this.props.itemlabel, text);
          }}
          value={this.props.defaultvalue}
          editable={false}
        />
      </View>
    );
  }

  renderDateTime(format) {
    if (format == 'TimePicker') {
      return (
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: '100%',
              backgroundColor: 'dodgerblue',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.showDateTimePicker();
            }}>
            <Text style={{color: 'white'}}>PICK</Text>
          </TouchableOpacity>
          <TextInput
            style={{
              height: 50,
              flex: 1,
              borderRadius: 3,
              borderWidth: 0.5,
              borderColor: 'gray',
              backgroundColor: 'white',
              textAlign: 'center',
              fontSize: 17,
            }}
            value={this.props.defaultvalue}
            editable={false}
          />
        </View>
      );
    } else return null;
  }

  renderSwitch() {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Switch
          onValueChange={data => {
            this.onSwitch(data);
          }}
          value={this.props.defaultvalue}
        />
      </View>
    );
  }

  render() {
    const itemlabel = this.props.itemlabel;
    const datainputtype = this.props.datainputtype; //TextInput //Picker

    return (
      <View
        style={{
          height: 50,
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 3,
          paddingLeft: 15,
        }}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          locale="en_GB"
          mode={'time'}
          onConfirm={data => this.handleDatePicked(data)}
          onCancel={() => this.hideDateTimePicker()}
        />
        <View
          style={{
            width: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflow: 'hidden',
          }}>
          <Text style={{fontSize: 17}}>{itemlabel}</Text>
        </View>
        {datainputtype == 'TextInput'
          ? this.renderTextInput()
          : datainputtype == 'TimePicker'
          ? this.renderDateTime('TimePicker')
          : datainputtype == 'Switch'
          ? this.renderSwitch()
          : datainputtype == 'TextLabel'
          ? this.renderLockedLabel()
          : datainputtype == 'Range'
          ? this.renderRange()
          : this.renderPicker()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    settingdatalist: state.settingdatalist,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCoupleInput: (itemlabel, datainput) =>
      dispatch(changeCoupleInput(itemlabel, datainput)),
    changeCoupleInputNew: (parentkey, itemlabel, datainput) =>
      dispatch(changeCoupleInputNew(parentkey, itemlabel, datainput)),
    testFunc: testVarInput => dispatch(testFunc(testVarInput)),
    changeCurrentSlotSetting: currentnumber =>
      dispatch(changeCurrentSlotSetting(currentnumber)),
    changeSlotData: (itemlabel, datainput) =>
      dispatch(changeSlotData(itemlabel, datainput)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataInputItem);
