import initialState from './InitialState';

const settingpage1reducer = (state = initialState, action) => {
    switch(action.type){
        case 'CHANGE_COUPLE_INPUT':
            return {...state, 
                settingdatalist: state.settingdatalist.map((item)=>
                    (item.itemlabel==action.itemlabel ? {...item, datainput: action.datainput} : item)
                )
            }
        case 'HIHI':
            return {...state,
                testvar: action.testvar
            }
        default: 
            return state
    }
}

export default settingpage1reducer