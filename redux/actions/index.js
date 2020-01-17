export const changeCoupleInputNew = (parentkey, itemlabel, datainput) => (
    {
        type: 'CHANGE_COUPLE_INPUT_' + parentkey,
        parentkey: parentkey,
        itemlabel: itemlabel,
        datainput: datainput,
    }
)

export const createBeverageItem = (slotsetting, name, price, validslots, imagesource, uid) => (
    {
        type: 'CREATE_BEVERAGE_ITEM',
        slotsetting: slotsetting,
        name: name,
        price: price,
        validslots: validslots,
        imagesource: imagesource,
        uid: uid
  
    }
)

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

export const changeSlotData = (itemlabel, datainput) => ({
    type: 'CHANGE_SLOT_DATA',
    itemlabel: itemlabel,
    datainput: datainput,
})

export const saveBeverageInfoChanges = (slotsetting, name, price, validslots, imagesource,uid, slotfrom, slotto) => ({
    type: 'SAVE_BEVERAGE_INFO_CHANGES',
    slotsetting: slotsetting,
    name: name,
    price: price,
    validslots: validslots,
    imagesource: imagesource,
    uid: uid,
    slotfrom: slotfrom,
    slotto: slotto,
    
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