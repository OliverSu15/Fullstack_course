

const Filterreducer = (state = '', action) => {
    switch (action.type){
        case 'CHANGE': return action.data.filter
        default: return state
    }
}

export const change = (filter) => {
    return {
        type:'CHANGE',
        data: {filter: filter}
    }
}


export default Filterreducer