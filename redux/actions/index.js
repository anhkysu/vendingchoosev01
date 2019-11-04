export const changeCoupleInput = (itemlabel, datainput) => ({
    type: 'CHANGE_COUPLE_INPUT',
    itemlabel: itemlabel,
    datainput: datainput,
})

export const testFunc = testVar => ({
    type: 'HIHI',
    testvar: testVar
})

export const updateOneSlotData = newoneslotdata => ({
    type: 'UPDATE_ONE_SLOT_DATA',
    newoneslotdata: newoneslotdata,
})

export const changeCurrentSlotSetting = currentnumber => ({
    type: 'CHANGE_CURRENT_SLOT_SETTING',
    currentslotsetting: currentnumber,
})

export const updateDataInput = (datatag, data) => ({
    type: 'UDPATE_DATA_INPUT',
    datatag: datatag,
    newdata: data,
})