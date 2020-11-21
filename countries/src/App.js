import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries.js'


function App() {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    const handleSearch = (event) =>{
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const countriesToShow = (search.length === 0)
        ? []
        : countries.filter(country => ((country.name).toUpperCase()).includes(search.toUpperCase()))

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    return (
    <div className="App">
        Find countries: <input type="text" onChange={handleSearch}/>
        <Countries countries={countriesToShow} setSearch={setSearch}/>

    </div>
  );
}

export default App;
