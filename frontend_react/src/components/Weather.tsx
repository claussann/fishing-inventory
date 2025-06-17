import { useEffect, useState } from "react"
import Input from "./Input"

type WeatherProps = {
    current: { apparent_temperature: string }
    daily: { sunrise: string, sunset: string, precipitation_probability_max: string, weathercode: number[] }
}

type CityType = {
    town: string,
    country: string,
    county: string
}
function Weather() {
    const [weather, setWeather] = useState<WeatherProps>({ current: { apparent_temperature: '' }, daily: { sunrise: '', sunset: '', precipitation_probability_max: '', weathercode: [] } })
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [city, setCity] = useState<CityType>({ town: '', country: '', county: '' })
    const [loading, setLoading] = useState(false)

    function getWeather() {
        if (!latitude || !longitude) {
            alert('Please enter latitude and longitude')
        } else if (isNaN(latitude) || isNaN(longitude) && latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            alert('Please write a valid latitude and longitude es: 42,12')
        } else {
            dataWeather()
        }
    }
    async function dataWeather() {
        setLoading(true)
        try {
            const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,sunrise,sunset,precipitation_probability_max&current=apparent_temperature&timezone=auto`)
            const weather = await data.json()
            console.log(weather)
            setWeather(weather)
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
        const dataCity = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
                headers: {
                    "User-Agent": "Fishing_Inventory (clausann92@gmail.com)"
                }
            }
        )
        const city = await dataCity.json()
        console.log(city.address)
        setCity(city.address)
    }

    function getWeatherEmoji(code: number) {
        const emojiMap: { [key: number]: string } = {
            0: '☀️',      // Clear sky
            1: '🌤️',     // Mainly clear
            2: '⛅',      // Partly cloudy
            3: '☁️',      // Overcast
            45: '🌫️',     // Fog
            48: '🌫️',     // Depositing rime fog
            51: '🌦️',     // Drizzle
            61: '🌧️',     // Rain
            71: '🌨️',     // Snow
            80: '🌧️',     // Rain showers
            95: '⛈️',     // Thunderstorm
            96: '⛈️⚡',    // Thunderstorm with hail
        }
        return emojiMap[code] || '❓';
    }

    return (
        <div className="col-12 text-center border border-secondary p-2">
            <div className="col-12 text-center">
                <h1>Weather</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-10 m-2">
                    <Input type='number' id="latitude" label="Latitude:" onChange={(e) => setLatitude(parseFloat(e.target.value))} value={latitude} placeholder="Latitude" />
                </div>
                <div className="col-10 m-2">
                    <Input type='number' id="longitude" label="Longitude:" onChange={(e) => setLongitude(parseFloat(e.target.value))} value={longitude} placeholder="Longitude" />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-10 m-2">
                    <button className="btn btn-secondary" onClick={getWeather}>Get Weather</button>
                </div>
            </div>
            <div className="row">
                {loading && <h5> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</h5>}
                <div className="col-12 text-center">
                    <h6>Temperature: {weather.current.apparent_temperature}</h6>
                    <h6>Precipitation Probability: {weather.daily.precipitation_probability_max[0]}</h6>
                    <h6>Weather: {getWeatherEmoji(weather.daily.weathercode[0])}</h6>
                    <h6>City:{city.town || ''} {city.country || ''} {city.county || ''}</h6>
                </div>
            </div>
        </div >
    )
}

export default Weather