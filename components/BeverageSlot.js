import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

export default class BeverageSlot extends Component {
  constructor(props) {
    super(props);
  }

  haha() {
    console.log('ah');
  }

  render() {
    const slotSetting = this.props.slotSetting;
    const validSlots = this.props.validSlots;
    const name = this.props.name;
    const price = this.props.price;
    const imageSource = this.props.imageSource;
    const slotFrom = this.props.slotFrom;
    const slotTo = this.props.slotTo;
    const uid = this.props.uid;

    return (
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 5,
          display: 'flex',
          width: this.props.itemWidth,
          height: '100%',
          borderRadius: 7,
          borderWidth: 0.5,
          borderColor: '#3e81f4',
        }}>
        {name == 'notfound' ? null : (
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              this.props.myMethod1({
                slotSetting: slotSetting,
                validSlots: validSlots,
                from: slotFrom,
                to: slotTo,
                name: name,
                price: price,
                image: imageSource,
                uid: uid
              });
            }}>
            <View style={{display: 'flex', flex: 1}}>
              <View
                style={{
                  height: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                  marginTop: 5,
                }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontSize: this.props.itemFontSize,
                      backgroundColor: 'whitesmoke',
                      paddingHorizontal: 15,
                      borderRadius: 5,
                    }}>
                    Vị trí slot: {slotFrom}
                  </Text>
                
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    height: this.props.itemHeight / 2.5,
                    width: this.props.itemWidth / 2.5,
                  }}
                  source={{uri: `${imageSource}`}}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  minHeight: 20,
                  padding: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#3e81f4',
                    fontWeight: 'bold',
                    fontSize: this.props.itemFontSize,
                  }}>
                  {name}
                </Text>
              </View>
              <View
                style={{
                  minHeight: 20,
                  padding: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: 'green', fontSize: this.props.itemFontSize}}>
                  {price} VND
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
