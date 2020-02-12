export const receiveUartData = dispatch => (uartData) => {
    dispatch({
    type: 'RECEIVE_UART_DATA',
    data: uartData
})}

export const testUart = dispatch => () => {
    dispatch({
    type: 'RECEIVE_UART_DATA',
    data: "uartData"
})}