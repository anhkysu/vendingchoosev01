const productDefaultData =  [
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
];

export default function(state = productDefaultData, action){
    switch(action.type){
        case 'change_new_product_data':
            return state;
            break;
        default:
            return state;
    }
}