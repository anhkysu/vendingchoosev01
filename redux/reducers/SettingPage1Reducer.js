import initialState from './InitialState';

const settingpage1reducer = (state = initialState, action) => {
    switch(action.type){
        case 'CHANGE_NUMBER_OF_COLUMN':
            return {...state, noofcol: action.noofcol}
        default: 
            return state
    }
}

export default settingpage1reducer