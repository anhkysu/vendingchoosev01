export default function(state = null, action) {
  switch (action.type) {
    case 'RECEIVE_UART_DATA':
      return action.data;
    default:
      return state;
  }
}
