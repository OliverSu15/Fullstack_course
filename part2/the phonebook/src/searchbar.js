import React from 'react'

const Searchbar = (props) => {

    return (<input value = {props.name} onChange = {props.handleEvent} />)
}

export default Searchbar