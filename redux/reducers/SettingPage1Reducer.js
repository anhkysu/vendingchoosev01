import initialState from './InitialState';

const settingpage1reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_COUPLE_INPUT':
            return {
                ...state,
                settingdatalist: state.settingdatalist.map((item) =>
                    (item.itemlabel == action.itemlabel ? { ...item, datainput: action.datainput } : item)
                )
            }

        case 'UPDATE_ONE_SLOT_DATA':
            return {
                ...state,
                oneslotdata: action.newoneslotdata
            }

        case 'HIHI':
            return {
                ...state,
                testvar: action.testvar
            }

        case 'CHANGE_CURRENT_SLOT_SETTING':
            return {
                ...state,
                currentslotsetting: action.currentslotsetting,
                oneslotdata: state.oneslotdata.map((item) =>
                    (item.itemlabel == "Slot Setting" ? { ...item, datainput: action.currentslotsetting } : item)
                )
            }

        case 'SAVE_BEVERAGE_INFO_CHANGES':
            return {
                ...state,
                initialbeveragestate: state.initialbeveragestate.map((item)=>
                    (item.slotsetting == action.slotsetting ? 
                        {
                            ...item,
                            validslots: action.validslots,
                            name: action.name,
                            price: action.price,
                            imagesource: action.imagesource
                        } 
                        : item)
                )
            }

        case 'CHANGE_SLOT_DATA':
            return {
                ...state,
                oneslotdata: state.oneslotdata.map((item) =>
                    (item.itemlabel == action.itemlabel ? { ...item, datainput: action.datainput } : item)
                )
            }

        case 'ADD_NEW_BEVERAGE_ITEM':
            return {
                ...state,
                initialbeveragestate: [
                    ...state.initialbeveragestate,
                    {
                        slotsetting: action.slotsetting,
                        validslots: action.validslots,
                        name: action.name,
                        price: action.price,
                        imagesource: action.imagesource,
                    }
                ]
            }
        default:
            return state
    }
}

export default settingpage1reducer