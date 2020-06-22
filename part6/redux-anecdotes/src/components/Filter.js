import React from 'react'
import { connect } from 'react-redux'
import {change} from '../reducers/filterReducer'

const Filter = (props) => {
  const filter = props.Filter
  
  const handleChange = (event) => {
      props.change(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter}/>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        Filter: state.Filter
    }
  }

const mapDispatchToProps = {
    change,
  }

const ConnectedFilter = connect(mapStateToProps,mapDispatchToProps)(Filter)
export default ConnectedFilter