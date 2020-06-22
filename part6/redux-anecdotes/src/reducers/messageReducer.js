
const Messagereducer = (state = null, action) => {
    switch (action.type){
        case 'CREATE': return action.data.message
        case 'CNCLE': return null
        default: return state
    }

}

export const creat = (message) => {
    return {
        type:'CREATE',
        data: {message: message}
    }
}

export const cancle = () => {
    return {
        type: 'CNCLE'
    }
}

export const setNotification =(message, ms) => {
    return async dispatch => {
        await dispatch(creat(message))
        setTimeout(() => dispatch(cancle()), ms)
    }
}


export default Messagereducer

