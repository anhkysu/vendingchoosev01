

function mySendingSerial(data) {
    console.log(data);
}

sendSerialDataToFirmware("hii","test",{value: "kaka"}, mySendingSerial);