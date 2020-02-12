const myState = {send: null, receive: null, notStrict: false}

export default function(state = myState, action) {
  switch (action.type) {
    case 'RECEIVE_UART_DATA':
      return {
        ...state,
        receive: action.data,
      };
    case 'SEND_UART_DATA':
      return {
        ...state,
        send: action.data,
        notStrict: action.notStrict
      };
    default:
      return state;
  }
}
