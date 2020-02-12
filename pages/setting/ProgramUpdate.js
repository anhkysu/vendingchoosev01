import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import {connect} from 'react-redux';
import DataInputItem from '../../components/DataInputItem';

class ProgramUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: 10,marginHorizontal: 20, display:"flex", alignItems:"center"}}>
        {this.props.programUpdate.map((datainput, index) => {
          return (
            <DataInputItem
              key={index}
              parentDataKey={'updateProgram'}
              itemlabel={datainput.itemlabel}
              datainputtype={datainput.datainputtype}
              defaultvalue={datainput.datainput}
              pickeroptions={datainput.options}
              constraint={datainput.constraint}
            />
          );
        })}
        <TouchableOpacity style={{backgroundColor: "dodgerblue", marginTop: 20, padding: 10, paddingHorizontal: 20, borderRadius: 5}}>
            <Text style={{fontSize: 18, color: 'white'}}>
                Cập nhật
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {}
}

function mapStateToProps(state) {
  return {
    programUpdate: state.settingpage1reducer.programUpdate,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramUpdate);
