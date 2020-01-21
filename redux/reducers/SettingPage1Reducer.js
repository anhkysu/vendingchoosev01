import initialState from './InitialState';

const settingpage1reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_COUPLE_INPUT':
      return {
        ...state,
        settingdatalist: state.settingdatalist.map(item =>
          item.itemlabel == action.itemlabel
            ? {...item, datainput: action.datainput}
            : item,
        ),
      };

    case 'CHANGE_COUPLE_INPUT_layoutSettings':
      return {
        ...state,
        settingdatalist: state.settingdatalist.map(item =>
          item.itemlabel == action.itemlabel
            ? {...item, datainput: action.datainput}
            : item,
        ),
      };

    case 'CHANGE_COUPLE_INPUT_slotsManagement':
      return {
        ...state,
        slotsManagement: state.slotsManagement.map(item =>
          item.itemlabel == action.itemlabel
            ? {...item, datainput: action.datainput}
            : item,
        ),
      };

    case 'CHANGE_COUPLE_INPUT_machineSettings':
      return {
        ...state,
        machineSettings: state.machineSettings.map(item =>
          item.itemlabel == action.itemlabel
            ? {...item, datainput: action.datainput}
            : item,
        ),
      };

    case 'CHANGE_COUPLE_INPUT_paymentSettings':
      return {
        ...state,
        paymentSettings: state.paymentSettings.map(item =>
          item.itemlabel == action.itemlabel
            ? {...item, datainput: action.datainput}
            : item,
        ),
      };

    case 'CHANGE_COUPLE_INPUT_serialPortSettings':
      return {
        ...state,
        serialPortSettings: state.serialPortSettings.map(item =>
          item.itemlabel == action.itemlabel
            ? {...item, datainput: action.datainput}
            : item,
        ),
      };

    case 'CHANGE_COUPLE_INPUT_oneslotdata':
      return {
        ...state,
        oneslotdata: state.oneslotdata.map(item =>
          item.itemlabel == action.itemlabel
            ? {...item, datainput: action.datainput}
            : item,
        ),
      };

    case 'UPDATE_ONE_SLOT_DATA':
      return {
        ...state,
        oneslotdata: action.newoneslotdata,
      };

    case 'DELETE_ITEM':
        return {
            ...state,
            initialbeveragestate: state.initialbeveragestate.filter(item =>
              item.slotsetting !== action.slotsetting
            ),
          };

    case 'HIHI':
      return {
        ...state,
        testvar: action.testvar,
      };

    case 'CHANGE_CURRENT_SLOT_SETTING':
      return {
        ...state,
        currentslotsetting: action.currentslotsetting,
        oneslotdata: state.oneslotdata.map(item =>
          item.itemlabel == 'Slot Setting'
            ? {...item, datainput: action.currentslotsetting}
            : item,
        ),
      };

    case 'SAVE_BEVERAGE_INFO_CHANGES':
      return {
        ...state,
        initialbeveragestate: state.initialbeveragestate.map(item =>
          item.slotsetting == action.slotsetting
            ? {
                ...item,
                validslots: action.validslots || item.validslots,
                name: action.name,
                price: action.price,
                imagesource: action.imagesource,
                uid: action.uid,
                from: action.slotfrom || item.from,
                to: action.slotto || item.to,
              }
            : item,
        ),
      };

    case 'CREATE_BEVERAGE_ITEM':
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
            uid: action.uid,
          },
        ],
      };

    case 'CHANGE_SLOT_DATA':
      return {
        ...state,
        oneslotdata: state.oneslotdata.map(item =>
          item.itemlabel == action.itemlabel
            ? {...item, datainput: action.datainput}
            : item,
        ),
      };

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
            uid: action.uid,
          },
        ],
      };
    default:
      return state;
  }
};

export default settingpage1reducer;
