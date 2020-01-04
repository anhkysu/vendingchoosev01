export const processSerialDataToFirmware = function(topic, type, content) {
    var serialString = JSON.stringify({ topic: topic, type: type, content: content });
    return serialString;
}

export const sendSelectedSlot = function(slotId, sendSerialDataToFwFunction){
    var content = {value: slotId};
    var selectedSlotString = processSerialDataToFirmware("slots", "event", content);
    sendSerialDataToFwFunction(selectedSlotString);
}

export const sendContinueOrCancelTransaction = function(ContinueOrCancel, sendSerialDataToFwFunction, optionNotStrict){
    if(typeof ContinueOrCancel != 'number'){
        console.log("Error, ContinueOrCancel must be a number");
    }
    var content = {value: ContinueOrCancel};
    var continueOrCancelString = processSerialDataToFirmware("purchase", "event", content);
    sendSerialDataToFwFunction(continueOrCancelString, optionNotStrict);
}

export const sendPaymentMethod = function (methodString, sendSerialDataToFwFunction){
    var content = {};
    switch(methodString){
        case 'cancel':
            content = {value: 0};
            break; 
        case 'cash':
            content = {value: 1};
            break;
        case 'momo':
            content = {value: 2};
            break;
        default: 
            break;
    };
    var paymentMethodString = processSerialDataToFirmware("paymentMethod", "event", content);
    sendSerialDataToFwFunction(paymentMethodString);
}

export const sendUserFeedbackAboutDisabilityOfGivingBackCashChange = function(userAccept, sendSerialDataToFwFunction) {
    var content = (userAccept ? {value: 1} : {value: 0});
    var userFeedbackString = processSerialDataToFirmware("cashMethod", "request", content);
    sendSerialDataToFwFunction(userFeedbackString);
}

export const sendMachineSettings = function (machineSettingDataArray, sendSerialDataToFwFunction){
    if(typeof machineSettingDataArray != Array) return;
    var content = machineSettingDataArray;
    var machineSettingString = processSerialDataToFirmware("setting", "update", content);
    sendSerialDataToFwFunction(machineSettingString);
}

export const sendRequirementOfMachineSettings = function (machineSettingRequiredDataArray, sendSerialDataToFwFunction){
    if(typeof machineSettingRequiredDataArray != Array) return;
    var content = machineSettingRequiredDataArray;
    var machineSettingRequiredDataArray = processSerialDataToFirmware("setting", "request", content);
    sendSerialDataToFwFunction(machineSettingRequiredDataArray);
}

function writeLog(data){
    console.log(data);
}

