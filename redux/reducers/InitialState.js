var initialState = {
  noofcol: "4",
  currentslotsetting: "1",
  settingdatalist: [
    {
      itemlabel: "Số Lượng Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "15",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Số Cột Hiển Thị",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "3",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Time Chuyển Trang",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "10000",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Chiều ngang 1 Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "150",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Chiều cao 1 Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "130",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Cỡ Font 1 Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "13",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Chiều cao Header",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "40",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Chiều cao Footer",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "50",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Cỡ Font Header",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "19",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Cỡ Font Footer",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "13",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Notif Panel Width",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "500",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Notif Panel Height",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "200",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
    {
      itemlabel: "Notif Panel Font Size",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "18",
      constraint: {type:"number", minValue: 1, maxValue: 1000}
    },
  ],
  initialbeveragestate: [
    {
      slotsetting: "1",
      uid: "1",
      from: "1",
      to: "10",
      validslots: "2",
      name: "Coca Cola",
      price: "10000",
      imagesource: "https://truwena.co.za/wp-content/uploads/2019/01/coca-cola-can.png"
    },
    {
      slotsetting: "2",
      uid: "3",
      validslots: "5",
      from: "1",
      to: "10",
      name: "Trà Xanh Không Độ",
      price: "10000",
      imagesource: "https://sieuthitt.com/images/stories/virtuemart/product/Tr___xanh_kh__ng_543a3bd0566d0.png"
    },
    {
      slotsetting: "3",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Trà Bí Đao Wonder",
      price: "10000",
      imagesource: "http://www.fujimart.vn/image/cache/catalog/%C4%90%E1%BB%93%20u%E1%BB%91ng/IMG_0624-502x502.png"
    },
    {
      slotsetting: "4",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "5",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Trà Bí Đao Wonder",
      price: "10000",
      imagesource: "http://www.fujimart.vn/image/cache/catalog/%C4%90%E1%BB%93%20u%E1%BB%91ng/IMG_0624-502x502.png"
    },
    {
      slotsetting: "6",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "7",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "8",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "9",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "10",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Trà Bí Đao Wonder",
      price: "10000",
      imagesource: "http://www.fujimart.vn/image/cache/catalog/%C4%90%E1%BB%93%20u%E1%BB%91ng/IMG_0624-502x502.png"
    },
    {
      slotsetting: "11",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "12",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
    {
      slotsetting: "13",
      uid: "1",
      validslots: "6",
      from: "1",
      to: "10",
      name: "Bò Húc",
      price: "10000",
      imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
    },
  ],
  oneslotdata: [
    {
      itemlabel: "Tên sản phẩm",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Nước gì",
      constraint: {type:"text", maxLength: 36}
    },
    {
      itemlabel: "Giá sản phẩm",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "5000",
      constraint: {type:"number", minValue: 1000, maxValue: 1000000}
    },
    {
      itemlabel: "ID sản phẩm",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"number", minValue: 1, maxValue: 199}
    },
    {
      itemlabel: "UID sản phẩm",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"number", minValue: 1, maxValue: 199}
    },
  ],
  machineSettings: [
    {
      itemlabel: "ID máy",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"text", maxLength: 36}
    },
    {
      itemlabel: "IP Server",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Trà xanh không độ",
      constraint: {type:"text", maxLength: 36}
    },
    {
      itemlabel: "Version Firmware",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "AKCBB"
    },
    {
      itemlabel: "Tổng số Slot",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"number", minValue: 1, maxValue: 199}
    },
    {
      itemlabel: "Trạng thái Server",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: false,
    },
    {
      itemlabel: "Thời gian Start Máy Lạnh Buổi 1",
      datainputtype: "TimePicker",
      options: { "nope": "nope" },
      datainput: "1",
    },
    {
      itemlabel: "Thời gian Stop Máy Lạnh Buổi 1",
      datainputtype: "TimePicker",
      options: { "nope": "nope" },
      datainput: "1",
    },
    {
      itemlabel: "Nhiệt độ Start Máy Lạnh Buổi 1",
      datainputtype: "Range",
      options: { "nope": "nope" },
      datainput: ["1","2"],
      constraint: {type:"number", minValue: 1, maxValue: 35}
    },
    {
      itemlabel: "Nhiệt độ Start Máy Lạnh Buổi 2",
      datainputtype: "Range",
      options: { "nope": "nope" },
      datainput: ["3","4"],
      constraint: {type:"number", minValue: 5, maxValue: 35}
    },
    {
      itemlabel: "Chế độ máy lạnh",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: false,
      constraint: {type:"number", minValue: 5, maxValue: 35}
    },
    {
      itemlabel: "Chế độ nhiệt",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: false,
      constraint: {type:"number", minValue: 5, maxValue: 35}
    },
    {
      itemlabel: "Chế độ quạt",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: false,
      constraint: {type:"number", minValue: 5, maxValue: 35}
    },
  ],
  paymentSettings: [
    {
      itemlabel: "Trạng thái thanh toán online",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: false,
    },
    {
      itemlabel: "Mệnh giá tiền mặt tối đa cho phép",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "10000",
      constraint: {type:"number", minValue: 1000, maxValue: 1000000}
    },
    {
      itemlabel: "Mệnh giá tiền mặt tối thiểu cho phép",
      datainputtype: "Picker",
      options: { "10000": "10000","20000": "20000",  },
      datainput: "10000",
      constraint: {type:"number", minValue: 1000, maxValue: 1000000}
    },
    {
      itemlabel: "Trạng thái cho phép thối tiền",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: false,
    },
    {
      itemlabel: "Tổng tiền mặt cho phép nhận",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"number", minValue: 10000, maxValue: 500000}
    },
    {
      itemlabel: "Số lượng tờ tiến tối đa dưới ngăn chứa",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "10000",
      constraint: {type:"number", minValue: 100, maxValue: 300}
    },
  ],
  passwords: [
    {
      itemlabel: "Tên tài khoản",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Yeah",
      constraint: {type:"text", maxLength: 36}
    },
    {
      itemlabel: "Mật khẩu",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Yeah",
      constraint: {type:"text", maxLength: 36}
    },
    {
      itemlabel: "Nhập lại mật khẩu",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Yeah",
      constraint: {type:"text", maxLength: 36}
    },
  ],
  slotLinks: [
    {
      itemlabel: "Slot được Link",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "1",
    },
    {
      itemlabel: "Phím đang chọn",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Trà xanh không độ"
    },
  ],
  serialPortSettings: [
    {
      itemlabel: "COM",
      datainputtype: "Picker",
      options: { "COM1": "COM1", "COM2": "COM2" },
      datainput: "COM2",
    },
    {
      itemlabel: "Baudrate",
      datainputtype: "Picker",
      options: { "600": "600","1200": "1200","2400": "2400","4800": "4800","9600": "9600","14400": "14400","19200": "19200","38400": "38400","56000": "56000","57600": "57600","115200": "115200" },
      datainput: "9600",
    },
    {
      itemlabel: "Datasize",
      datainputtype: "Picker",
      options: { "7": "7", "8": "8" },
      datainput: "7",
    },
    {
      itemlabel: "Parity",
      datainputtype: "Picker",
      options: { "ODD": "1", "EVEN": "2","NONE": "0" },
      datainput: "0",
    },
  ],
  slotsManagement: [
    {
      itemlabel: "Vị trí slot",
      datainputtype: "Range",
      options: { "nope": "nope" },
      datainput: ["1","3"],
      constraint: {type:"number", minValue: 0, maxValue: 100}
    },
    {
      itemlabel: "Giá sản phẩm",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "10000",
      constraint: {type:"number", minValue: 1000, maxValue: 1000000}
    },
    {
      itemlabel: "Số lượng đang có",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "3",
      constraint: {type:"number", minValue: 1, maxValue: 99}
    },
    {
      itemlabel: "Số lượng tối đa",
      datainputtype: "TextInput",
      options: {  "nope": "nope" },
      datainput: "99",
      constraint: {type:"number", minValue: 1, maxValue: 99}
    },
  ]
  ,
  testMachine: [
    {
      itemlabel: "Chạy thử đèn",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: "10",
      constraint: {type:"number", minValue: 0, maxValue: 100}
    },
    {
      itemlabel: "Chạy thử máy lạnh",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: "100",
      constraint: {type:"number", minValue: 0, maxValue: 100}
    },
    {
      itemlabel: "Chạy thử nhiệt",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: "10000",
      constraint: {type:"number", minValue: 1000, maxValue: 1000000}
    },
    {
      itemlabel: "Chạy thử quạt",
      datainputtype: "Switch",
      options: { "nope": "nope" },
      datainput: "3",
      constraint: {type:"number", minValue: 1, maxValue: 99}
    },
    {
      itemlabel: "Chạy thử đèn QR",
      datainputtype: "Switch",
      options: {  "nope": "nope" },
      datainput: "99",
      constraint: {type:"number", minValue: 1, maxValue: 99}
    },
    {
      itemlabel: "Chạy thử Slot",
      datainputtype: "Range",
      options: {  "nope": "nope" },
      datainput: ["03", "08"],
      constraint: {type:"number", minValue: 1, maxValue: 99}
    },
  ],
  newProductData: [
    {
      itemlabel: "Cài đặt sản phẩm",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Nước gì",
      constraint: {type:"text", maxLength: 36}
    },
    {
      itemlabel: "UID sản phẩm",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "5000",
      constraint: {type:"number", minValue: 1000, maxValue: 1000000}
    },
    {
      itemlabel: "Tên sản phẩm",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"number", minValue: 1, maxValue: 199}
    },
    {
      itemlabel: "Hình sản phẩm",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"number", minValue: 1, maxValue: 199}
    },
  ],
  newProductData: [
    {
      itemlabel: "Cài đặt sản phẩm",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "Nước gì",
      constraint: {type:"text", maxLength: 36}
    },
    {
      itemlabel: "UID sản phẩm",
      datainputtype: "TextInput",
      options: { "nope": "nope" },
      datainput: "5000",
      constraint: {type:"number", minValue: 1000, maxValue: 1000000}
    },
    {
      itemlabel: "Tên sản phẩm",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"number", minValue: 1, maxValue: 199}
    },
    {
      itemlabel: "Hình sản phẩm",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "1",
      constraint: {type:"number", minValue: 1, maxValue: 199}
    },
  ],
  programUpdate: [
    {
      itemlabel: "Phiên bản hiện tại",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "1.1.1",
      constraint: {type:"number", minValue: 0, maxValue: 100}
    },
    {
      itemlabel: "Phiên bản mới nhất",
      datainputtype: "TextLabel",
      options: { "nope": "nope" },
      datainput: "1.2.2",
      constraint: {type:"number", minValue: 0, maxValue: 100}
    },
  ],

  testvar: "notok"
}

export default initialState;