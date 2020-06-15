import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Searchbar = (props) => {

    return (<input value = {props.name} onChange = {props.handleEvent} />)
}

const Button = (props) => (
    <button onClick={props.handleClick}>
    {props.text}
    </button>
  )

const Show = ({result,clickEvent}) =>{
    if(result.length > 10) return <p>Too many matches, specify another filter</p>
    else if (result.length !== 1) return result.map((resu) => {return(<form onSubmit = {clickEvent(resu.name)} key = {resu.name}><p >{resu.name}</p><Button type="submit" text="show" /></form>)})
    else if (result.length === 1) return <Detail result = {result[0]}/>
    else return <p></p>
}

const Display = (props) => (
    <div>
    <h1>{props.content}</h1>
    </div>
  )

const Detail = ({result}) => {

    const [weather,setWeather] = useState([])

    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${result.capital}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}`)
        .then(respone => {
            setWeather(respone.data)
            console.log("get",weather)
        }
            )
    })

    console.log(weather)
    return (
        <div>
            <h1>{result.name}</h1>
            <p>capital:{result.capital}</p>
            <p>population:{result.population}</p>
            <h1>languages</h1>
            <table>
            <tbody>
            {result.languages.map((language) => <tr key = {language.name}><td key = {language.name}>{language.name}</td></tr>)}
            </tbody>
            </table>
            <img src = {result.flag} alt = "Flag"></img>
            <Display content = {"tempture:"+ (weather.main === undefined ? "" : weather.main.temp)}/>
            <Display content = {"wind:"+ (weather.wind === undefined ? "" : weather.wind.speed)}/>

        </div>
    )
}


const App = () => {

    const [searchText,setSearchText] = useState("")
    const [result,setResult] = useState([])

    const handleSearchEvent = (event) => {
        search(event.target.value)
        setSearchText(event.target.value)
    }
    
    const search = (name) => {
        axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(respone => {
            setResult(respone.data)
        })
    }

    const onC = (name) => (event) => {
        event.preventDefault()
        search(name)
        setSearchText(name)
    }

    return (
        <div>
            find countries
            <Searchbar name={searchText} handleEvent = {handleSearchEvent} />
            <Show result = {result} clickEvent = {onC}/>

        </div>
    )
}

export default App