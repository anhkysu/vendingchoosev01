export const changeCoupleInput = (itemlabel, datainput) => ({
    type: 'CHANGE_COUPLE_INPUT',
    itemlabel: itemlabel,
    datainput: datainput,
})

export const testFunc = testVar => ({
    type: 'HIHI',
    testvar: testVar
})

export const updateDataInput = (datatag, data) => ({
    type: 'UDPATE_DATA_INPUT',
    datatag: datatag,
    newdata: data,
})