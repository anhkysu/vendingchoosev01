const ListOfUi = [
"Màn hình đã chọn sản phẩm (2) ok" ,
"Màn hình mời nhận sản phẩm (3) ok",
"Màn hình cảm ơn quý khách (4) ok",

"Màn hình chờ hiển thị qr code (5)",
"Màn hình mời quét qr code (6)",

"Màn hình thông báo giao dịch momo thất bại (7)",
"Màn hình thông báo giao dịch momo thành công (8)",
"Màn hình thông báo mất mạng, không thể mua momo (9)",

"Màn hình mời nhận tiền thối (10) ok",
"Màn hình chính chọn sản phẩm (10 - 1) ok",
"Màn hình hiển thị không thể thối tiền thừa (10-2) ok",

"Màn hình hiển thị tiền đưa vào lớn hơn 50k (14-2)",
"Màn hình hiển thị không đủ tiền thối (14-1)",


]

export const onReceivedUiRequirement = function (uiId, additionalParams,subsequenceFunction) {
    if(typeof uiId != 'number') return;
    var uiDescription = ListOfUi[uiId] || "none";
    subsequenceFunction(uiId, uiDescription, additionalParams);
}

export const onPaymentMethodDisplayRequirement = function (showPaymentMethodFunction){
    showPaymentMethodFunction();
}

export const onUpdateCashAvailable = function (type,cashReceived,subsequenceFunction){
    subsequenceFunction(type,cashReceived);
}

export const onGivingBackInputDisabilityDisplayRequirement = function (showGivingBackInputDisabilityDisplayFunction){
    showGivingBackInputDisabilityDisplayFunction();
}   

export const onReceivedQrCode = function (base64String, showQrCodeFunction) {
    showQrCodeFunction(base64String);
}

export const onMomoTransactionResult = function (isSuccessful, subsequenceFunction){
    subsequenceFunction(isSuccessful);
}

export const onMomoTransactionTimeout = function (subsequenceFunction){
    subsequenceFunction();
}
