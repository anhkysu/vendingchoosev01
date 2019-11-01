export const changeNumberOfCol = numberofcol => ({
    type: 'CHANGE_NUMBER_OF_COLUMN',
    noofcol: numberofcol,
})

export const changeNumberOfSlot = numberofslot => ({
    type: 'CHANGE_NUMBER_OF_SLOT',
    noofslot: numberofslot,
})

export const updateDataInput = (datatag, data) => ({
    type: 'UDPATE_DATA_INPUT',
    datatag: datatag,
    newdata: data,
})