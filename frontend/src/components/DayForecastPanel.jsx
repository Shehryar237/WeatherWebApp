import React from 'react';
import styled from 'styled-components';
import { FrostedGlass } from './Effects/FrostedGlass';

function DayForecastPanel({forecastData,loading, error }) {

    if (loading) return <Loading>Loading today's forecast...</Loading>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
    if (!forecastData || !forecastData.length) return <NoData>No forecast data available.</NoData>;

    const forecastTimes = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00']; 
    const todayForecast = forecastData[0];
    if (!todayForecast || !todayForecast.selectedHours)  return <NoData>No data available for today.</NoData>;

    return (
        <FrostedGlass>
        <Wrapper>
            <p className='panelHeader'>Today's Forecast</p>
            <WeatherGrid>
                {forecastTimes.map((time, index)=>{
                const hourlyData = todayForecast.selectedHours.find(hour => hour.time.slice(-5) === time);
                return(
                        <TimeSlot key={index}>
                            <div className="time">{formatTime(time)}</div>
                            <div className="icon">
                                 {hourlyData && hourlyData.icon ? (
                                    <img 
                                        src={`https:${hourlyData.icon}`} 
                                        alt={hourlyData.condition} 
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-icon-url'; }}
                                    />
                                ):(
                                    '☁️'
                                )}
                            </div>
                            <div className="temp">{hourlyData ? `${hourlyData.temp_c}°C` : 'N/A'}</div>
                        </TimeSlot>
                    )
                }
            )}
            </WeatherGrid>
        </Wrapper>
        </FrostedGlass>
    );
}

const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    let formattedHour = parseInt(hour, 10);
    const period = formattedHour >= 12 ? 'PM' : 'AM';
    formattedHour = formattedHour % 12 === 0 ? 12 : formattedHour % 12;
    return `${formattedHour}:${minute} ${period}`;
}
const Loading = styled.div`
    color: white;
    font-size: 1.2rem;
    text-align: center;
`;
const ErrorMessage = styled.div`
    color: red;
    font-size: 1.2rem;
    text-align: center;
`;
const NoData = styled.div`
    color: gray;
    font-size: 1.2rem;
    text-align: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    //background-color: #2e2142; 
    color: #ffffff;
    //border: 1px solid yellow;
    padding: 2px 16px 10px 16px;
    box-sizing: border-box;
    border-radius:16px;
`;
const WeatherGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr); 
    gap: 10px; 
`;
const TimeSlot = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-right: 1px solid darkslategrey;

    .time {
        font-size: 14px;
        color: lightgrey;
    }
    .icon {
        font-size: 28px;
    }
    .temp {
        font-size: 18px;
        font-weight: bold;
    }
`;

export default DayForecastPanel;
