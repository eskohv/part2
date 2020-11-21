import React from 'react'
import Country from "./Country";

const Countries = ({countries,setSearch}) => {
    if(countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }else if(countries.length > 1) {
        return (
            <div>
                <ul>
                    {countries.map((country) =>
                        <div key={country.name}>
                            {country.name} <button onClick={() => setSearch(country.name)}>show</button>
                        </div>
                    )}
                </ul>
            </div>
        )
    }else if(countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]}/>
            </div>
        )
    } return null
}

export default Countries