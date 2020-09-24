import React from 'react';
export default function Weather(props) {
    return (
        <div>
            {
                props.weather.map(weather => {
                    return (
                        <div key={weather.id}>
                            <h3>Time: {weather.time} </h3>
                            <h4>Week: {weather.week} </h4>
                            <h4>Location: {weather.location} </h4>
                            {weather.time
                                ? <h5> What's the Weather Outside?</h5>
                                : <h5>What time? </h5>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}
