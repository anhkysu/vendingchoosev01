import initialState from './InitialState';

const homereducer = (state = initialBeverageState, action) => {
    switch(action.type){
        case 'ADD_NEW_BEVERAGE_ITEM':
            return {
                ...state,
                initialBeverageState: [
                    ...state.initialBeverageState,
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

export default homereducer