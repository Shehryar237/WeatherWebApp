import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import OverViewPanel from '../components/OverViewPanel';
import DayForecastPanel from '../components/DayForecastPanel';
import AirConditionPanel from '../components/AirConditionPanel';
import SevenDayForecastPanel from '../components/SevenDayForecastPanel';
import SearchBar from '../components/SearchBar';
import * as weatherService from '../services/weatherServices'; // Import all as weatherService
import { use } from 'react';

function WeatherPage() {
    const [city, setCity] = useState('New York')
    const [weatherData, setWeatherData] = useState(null)
    const [forecastData ,setForecastData] = useState(null);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const handleSearch = (query)=>{
        //This will be passed to the seachbar component
        setCity(query);
    }

    const fetchWeather = async()=>{
        setLoading(true);
        setError(null)
        try{
            const data=await weatherService.getCityData(city);
            console.log('Current Weather Data:', data)
            setWeatherData(data);

            const forecast = await weatherService.getForecastData(city, 3); // backend extends to 7 days
            console.log('Forecast Data:', forecast);
            setForecastData(forecast.forecast); // we are assuming backend sends { location, forecast }
        }
        catch (err) {
            setError(err);
            setWeatherData(null);
            setForecastData([]);
        } 
        finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if (!city) return;
        fetchWeather();
    }, [city]);

    return (
        <Wrapper>
            <AppWrapper>
                <MainBlock>
                <SearchBar onSearch={handleSearch}/>
                <div></div>
                    <LeftColumn>
                        <OverViewPanel weatherData={weatherData}/>
                        <DayForecastPanel forecastData={forecastData}/>
                        <AirConditionPanel weatherData={weatherData} loading={loading} error={error}/>
                    </LeftColumn>
                    <RightColumn>
                        <SevenDayForecastPanel forecastData={forecastData}/>
                    </RightColumn>
                </MainBlock>
            </AppWrapper>
        </Wrapper>
    )
}

const AppWrapper = styled.div`
    background-color: #0e0e1f;
    padding: 10px 20px;
    border-radius: 16px;
    background: rgba(14, 14, 31, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* Safari support */
    border: 1px solid rgba(255, 255, 255, 0.2);
`
const Wrapper = styled.div`
    background: linear-gradient(to bottom, #151c22, #1e2a31);
    align-items: center;
    display: flex; 
    flex-direction: column;
    min-height: 100vh;
    padding: 10px 10px;
    background: linear-gradient(to bottom, #2c3e50, #bdc3c7);

background:
    radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(29, 59, 78, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 50% 20%, rgba(44, 62, 80, 0.2) 0%, transparent 60%),
    radial-gradient(circle at 30% 80%, rgba(189, 195, 199, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 70% 20%, rgba(44, 62, 80, 0.2) 0%, transparent 50%),
    linear-gradient(to bottom, #12171b, #14232e);
`
const MainBlock = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: .01fr 3fr;
    //border: 1px solid yellow;
    gap:10px
`
const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
`

export default WeatherPage