var initialState = {
    noofcol: "4",
    settingdatalist: [
        {
            itemlabel: "Số Lượng Slot",
            datainputtype: "TextInput",
            options: {"nope":"nope"},
            datainput: "18",
        },
        {
            itemlabel: "Số Cột Hiển Thị",
            datainputtype: "TextInput",
            options: {"nope":"nope"},
            datainput: "4"
        },
        {
            itemlabel: "Time Chuyển Trang",
            datainputtype: "TextInput",
            options: {"nope":"nope"},
            datainput: "100",
        },
        {
            itemlabel: "COM",
            datainputtype: "Picker",
            options: {"COM1":"COM1", "COM2": "COM2"},
            datainput: "COM1",
        },
        {
            itemlabel: "Baudrate",
            datainputtype: "Picker",
            options: {"115200": "115200", "62500": "62500"},
            datainput: "115200",            
        },
        {
            itemlabel: "Databits",
            datainputtype: "Picker",
            options: {"8":"8", "16": "16"},
            datainput: "16",
        },
        {
            itemlabel: "Parity",
            datainputtype: "Picker",
            options: {"odd":"odd", "even": "even"},
            datainput: "odd",
        },
        {
            itemlabel: "Stop Bit",
            datainputtype: "Picker",
            options: {"1":"1", "2": "2"},
            datainput: "1",
        },
    ],
    testvar: "notok"
}

export default initialState;