import React from 'react';
import styled from 'styled-components';
import { FrostedGlass } from './Effects/FrostedGlass';

function SevenDayForecastPanel({forecastData}) {
    if (!forecastData || !Array.isArray(forecastData)) {
        return <NoData>No forecast data available.</NoData>;
    }
    return (
        <FrostedGlass style={{ height: '100%' }}>
        <Wrapper>
            <p className='blockTitle'>7 day forecast</p>
            <ForecastGrid>
                {forecastData.map((day,index)=>{
                    const date = new Date(day.date);
                    const dayName= date.toLocaleDateString('en-US',{weekday:'short'});
                    const icon = day.day.condition.icon;
                    const condition = day.day.condition.text;
                    const maxTemp = day.day.maxtemp_c;
                    const minTemp = day.day.mintemp_c;
                    return(
                        <DisplayItem key={index}>
                            <p className='title'>{index===0 ?'Today': dayName}</p>
                            <div className='icon'>
                                    {icon ? (
                                        <img
                                            src={`https:${icon}`}
                                            alt={condition}
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-icon-url'; }}
                                        />
                                    ) : (
                                        '☁️'
                                    )}
                                    <p>
                                        {condition}
                                    </p>
                                </div>
                                <p className='ratio'>
                                    {Math.round(maxTemp)}°/{Math.round(minTemp)}°
                                </p>
                            </DisplayItem>
                        );
     
                })}
                
            </ForecastGrid>
        </Wrapper>
        </FrostedGlass>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    //background-color:  #2e2142;
    border-radius: 5px;
    height: 100%;
    padding: 14px 18px;
    box-sizing: border-box; 
    border-radius:16px ;

    .blockTitle{
        color: lightgray;
    }
`
const ForecastGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(7, 1fr); 
    min-width: 260px;
`
const NoData = styled.div`
    color: gray;
    font-size: 1.2rem;
    text-align: center;
`;
const DisplayItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    border-bottom: 1px solid darkslategrey;
    padding: 10px 0px;
    //border: 1px solid blue;;
    height: 70px;

    .title{
        //border: 1px solid yellow;
        display: flex;
        text-justify: center;
        align-items: center;
        color: lightgray;
    }
    .icon{
       //border :1px solid yellow;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        img{
            width: 40%;
            //border:1px solid white;
            margin: 0px;
            padding: 0px;
        }
        p{
            //border: 1px red solid;
            margin: 0;
            padding: 0;
            font-size: 0.9rem;
           
        }
      
    }
    .ratio{
        //border :1px solid yellow;
        justify-self: right;
    }
`

export default SevenDayForecastPanel;