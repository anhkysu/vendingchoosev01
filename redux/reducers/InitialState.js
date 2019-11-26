var initialState = {
  noofcol: "4",
  currentslotsetting: "1",
  settingdatalist: [
    {
      itemlabel: "Số Lượng Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "15",
    },
    {
      itemlabel: "Số Cột Hiển Thị",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "3"
    },
    {
      itemlabel: "Time Chuyển Trang",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "10000",
    },
    {
      itemlabel: "Chiều ngang 1 Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "150",
    },
    {
      itemlabel: "Chiều cao 1 Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "130",
    },
    {
      itemlabel: "Cỡ Font 1 Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "13",
    },
    {
      itemlabel: "Chiều cao Header",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "40",
    },
    {
      itemlabel: "Chiều cao Footer",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "50",
    },
    {
      itemlabel: "Cỡ Font Header",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "19",
    },
    {
      itemlabel: "Cỡ Font Footer",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "13",
    },
    {
      itemlabel: "COM",
      datainputtype: "Picker",
      options: { "COM1": "COM1", "COM2": "COM2" },
      datainput: "COM1",
    },
    {
      itemlabel: "Baudrate",
      datainputtype: "Picker",
      options: { "115200": "115200", "62500": "62500" },
      datainput: "115200",
    },
    {
      itemlabel: "Databits",
      datainputtype: "Picker",
      options: { "8": "8", "16": "16" },
      datainput: "16",
    },
    {
      itemlabel: "Parity",
      datainputtype: "Picker",
      options: { "odd": "odd", "even": "even" },
      datainput: "odd",
    },
    {
      itemlabel: "Stop Bit",
      datainputtype: "Picker",
      options: { "1": "1", "2": "2" },
      datainput: "1",
    },
  ],
  initialbeveragestate: [
    {
      slotsetting: "1",
      validslots: "2",
      name: "Coca Cola",
      price: "10000",
      imagesource: "https://truwena.co.za/wp-content/uploads/2019/01/coca-cola-can.png"
    },
    {
      slotsetting: "2",
      validslots: "5",
      name: "Trà Xanh Không Độ",
      price: "10000",
      imagesource: "https://sieuthitt.com/images/stories/virtuemart/product/Tr___xanh_kh__ng_543a3bd0566d0.png"
    },
    {
      slotsetting: "3",
      validslots: "6",
      name: "Trà Bí Đao Wonder",
      price: "10000",
      imagesource: "http://www.fujimart.vn/image/cache/catalog/%C4%90%E1%BB%93%20u%E1%BB%91ng/IMG_0624-502x502.png"
    },
    {
      slotsetting: "4",
      validslots: "6",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "5",
      validslots: "6",
      name: "Trà Bí Đao Wonder",
      price: "10000",
      imagesource: "http://www.fujimart.vn/image/cache/catalog/%C4%90%E1%BB%93%20u%E1%BB%91ng/IMG_0624-502x502.png"
    },
    {
      slotsetting: "6",
      validslots: "6",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "7",
      validslots: "6",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "8",
      validslots: "6",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "9",
      validslots: "6",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "10",
      validslots: "6",
      name: "Trà Bí Đao Wonder",
      price: "10000",
      imagesource: "http://www.fujimart.vn/image/cache/catalog/%C4%90%E1%BB%93%20u%E1%BB%91ng/IMG_0624-502x502.png"
    },
    {
      slotsetting: "11",
      validslots: "6",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "12",
      validslots: "6",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "13",
      validslots: "6",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
  ],
  oneslotdata: [
    {
      itemlabel: "Slot Setting",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "1"
    },
    {
      itemlabel: "Tên Nước",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Trà xanh không độ"
    },
    {
      itemlabel: "Giá Tiền",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "10000"
    },
    {
      itemlabel: "Số Lượng",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "1",
    },
  ],
  testvar: "notok"
}

export default initialState;