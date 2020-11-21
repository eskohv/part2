import React from 'react'
import Weather from "./Weather";

const Country = ({country}) =>{

    return(
        <div>
            <h1>{country.name}</h1>
            capital {country.capital}
            <br/>
            population {country.population}

            <h2>Languages</h2>
            <ul>
                {(country.languages).map(language => <li key={language.name}>{language.name} </li>)}
            </ul>
            <img src={country.flag} alt={country.name} style={{width:200, height:150}}/>
            <Weather country={country}/>
        </div>
    )
}

export default Country