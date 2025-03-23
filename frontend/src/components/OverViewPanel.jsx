import React from 'react';
import styled from 'styled-components';

function OverViewPanel({weatherData}) {
    return (
        <Wrapper>
            {weatherData&&(
            <>
                <InfoBlock>
                    <h1 className='cityName'>{weatherData.location.name}</h1>
                    <p className='rainChance'>{weatherData.current.condition.text}</p>
                    <p className='cityTemp'>{weatherData.current.temp_c}C</p>
                </InfoBlock>

                <ImageBlock>
                    {weatherData && weatherData.current.condition.icon ? (
                        <img 
                            src={`https:${weatherData.current.condition.icon}`} 
                            alt={weatherData.condition} 
                            onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-icon-url'; }}
                                />
                        ) : (
                            '☁️'
                        )}
                </ImageBlock>
            </>)}
        </Wrapper>
    )
}

const Wrapper = styled.div `
    display: flex;
    width: 100%; //note this will be 100 percent of parent container, which will be in weatherPage.jsx
   // border: 2px solid red;
`
const InfoBlock = styled.div `
    display: flex;
    flex-direction: column;
    padding: 24px;
    //border: 1px solid yellow;
    width:60%;

    .cityName{
        //border: 1px solid white;
        margin-bottom: 0px;
    }

    .rainChance{
        font-size: 0.8rem;
        //border: 1px solid white;
        margin-top: 0px;
        padding-top: 10px;
        color:lightgray;
    }

    .cityTemp{
        font-size: 2.8rem;
        margin-bottom: 0px;
        margin-top: 16px;
        font-weight: bold;
    }
`
const ImageBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;

    img {
        width: 100px; 
        height: 100px; 
    }
`;
export default OverViewPanel