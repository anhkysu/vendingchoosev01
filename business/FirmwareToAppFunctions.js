const ListOfUi = [
"Màn hình đã chọn sản phẩm (2)",
"Màn hình mời nhận sản phẩm (3)",
"Màn hình cảm ơn quý khách (4)",
"Màn hình chờ hiển thị qr code (5)",
"Màn hình mời quét qr code (6)",
"Màn hình thông báo giao dịch momo thất bại (7)",
"Màn hình thông báo giao dịch momo thành công (8)",
"Màn hình thông báo mất mạng, không thể mua momo (9)",
"Màn hình mời nhận tiền thối (10)",
"Màn hình chính chọn sản phẩm (10 - 1)",
"Màn hình hiển thị không thể thối tiền thừa (10-2)",
]

export const onReceivedUiRequirement = function (uiId, additionalParams,subsequenceFunction) {
    if(typeof uiId != 'number') return;
    var uiDescription = ListOfUi[uiId] || "none";
    subsequenceFunction(uiDescription, additionalParams);
}

export const onPaymentMethodDisplayRequirement = function (showPaymentMethodFunction){
    showPaymentMethodFunction();
}

export const onUpdateCashAvailable = function (cashReceived, subsequenceFunction){
    subsequenceFunction(cashReceived);
}

export const onGivingBackChangeDisabilityDisplayRequirement = function (showGivingBackChangeDisabilityDisplayFunction){
    showGivingBackChangeDisabilityDisplayFunction();
}   

export const onReceivedQrCode = function (base64String, showQrCodeFunction) {
    showQrCodeFunction(base64String);
}

