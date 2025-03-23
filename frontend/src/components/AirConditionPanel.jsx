import React from 'react';
import styled from 'styled-components';
import { FrostedGlass } from './Effects/FrostedGlass';

function AirConditionPanel({weatherData}) {
    if (!weatherData) return <div>No forecast data available.</div>;
    console.log(weatherData.feelslike_c)
    return (
        <FrostedGlass>
        <Wrapper>
            <h2>Air conditions</h2>
            <ConditionsGrid>
            <DisplayItem>
                <div className="label"><div className="icon">🌡️</div>Real Feel</div>
                <div className="value">{weatherData.current.feelslike_c}°C</div>
            </DisplayItem>
            <DisplayItem>
                <div className="label"> <div className="icon">🌬️</div>Wind</div>
                <div className="value">{weatherData.current.wind_mph}mph</div>
            </DisplayItem>
            <DisplayItem>
                <div className="label"><div className="icon">🌧️</div>Humidity</div>
                <div className="value">{weatherData.current.uv}</div>
            </DisplayItem>
            <DisplayItem>
                <div className="label"><div className="icon">☀️</div>UV Index</div>
                <div className="value">{weatherData.current.humidity}</div>
            </DisplayItem>
            </ConditionsGrid>
        </Wrapper>
        </FrostedGlass>
    )
} 

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    //border: 1px solid yellow;
    border-radius:16px ;
    width: 100%;
    padding: 14px 6px;
    box-sizing: border-box; 
    //background-color: #2e2142; 
    h2{
        margin: 0;
        padding: 10px 0px 0px 20px;
    }
`
const ConditionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 80px; 
    padding: 20px;
    padding-top: 40px;
    border-radius: 10px;
    color: #ffffff; 
`
const DisplayItem = styled.div`
    display: flex;
    flex-direction: column;
    //border: 1px solid white;
    padding-bottom: 0px;
    margin-bottom: 0px;

    .icon {
        font-size: 24px;   
    } 
    .label {
        font-size: 1.2rem;
        color: #bbbbbb; 
        display: flex;
        align-items: center;
        gap:10px;
    }
    .value {
        font-weight: bold;
        //border: 1px solid red;
        padding: 0px 0px 0px 30px;
        font-size: 1.6rem;
    }
`
export default AirConditionPanel;