onCancelTransaction(availablecash) {
    if (availablecash <= 0) return;

    if(availablecash < 10000){
      Alert.alert(
        "Thông Báo",
        "Máy không có khả năng thối tiền lẻ. Mời nạp thêm tiền hoặc hủy bỏ số tiền này!" ),
        [
          {
            text: 'Nạp thêm',
            onPress: () => Alert.alert("Hướng dẫn", "Bỏ tiền có mệnh giá lớn hơn 10000 vnđ vào khe bên phải!"),
          },
          {text: 'Hủy', onPress: () => this.setState({cashavailable: 0})},
        ]
    }

    else {
      if((availablecash%10000) == 0){
        this.withdrawCashFromVM(availablecash);
      }

      else {
        Alert.alert(
          "Thông Báo",
          "Máy không thối được tiền lẻ có mệnh giá dưới 10000. Quý khách có muốn rút số tiền còn lại hay nạp thêm?",
          [
            {
              text: 'Nạp thêm',
              onPress: () => Alert.alert("Hướng dẫn", "Bỏ tiền có mệnh giá lớn hơn 10000 vnđ vào khe bên phải!"),
            },
            {text: 'Tiếp tục rút', onPress: () => this.withdrawCashFromVM(availablecash - (availablecash%10000))},
            {text: 'Hủy số tiền', onPress: () => this.setState({cashavailable: 0})},
          ]
        );
      }
    }
  }