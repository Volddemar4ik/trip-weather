import React, { useState, useEffect } from "react";
import Icon from "../icon";
import { timeLeftTimer, } from '../../functions'
import './style.css'

export default function Sidebar({ sidebarData }) {
    const currentCity = sidebarData?.currentWeatherInCity?.address
    const currentCityWeather = currentCity && sidebarData?.currentWeatherInCity?.days[0]

    return (
        <div className="sidebar">
            {currentCity &&
                <div className="sidebar__container">
                    <div className="sidebar__weather">
                        <div className="sidebar__header">
                            <p>Today</p>
                        </div>

                        <div className="sidebar__adress">
                            <h3>
                                {currentCity}
                            </h3>

                            <span>
                                ({currentCityWeather?.conditions})
                            </span>
                        </div>

                        <div className="sidebar__weather-icon">
                            <Icon iconName={currentCityWeather?.icon} />
                        </div>

                        <div className="sidebar__weather-temperature">
                            <p>
                                {currentCityWeather?.temp}&#176;
                            </p>
                        </div>

                        <div className="sidebar__weather-description">
                            <p>
                                {currentCityWeather?.description}
                            </p>
                        </div>
                    </div>

                    <Timer dateToCalculate={sidebarData?.tripStartDate} />
                </div>
            }
        </div>
    )
}

function Timer({ dateToCalculate }) {
    const [timeLeft, setTimeLeft] = useState({})
    const timerParametrs = ['days', 'hours', 'minutes', 'seconds',]

    useEffect(() => {
        if (dateToCalculate) {
            const tcurrentTimer = setTimeout(() => {
                setTimeLeft(timeLeftTimer(dateToCalculate))
            }, 1000)

            return () => clearTimeout(tcurrentTimer)
        }
    })

    return (
        <div className="timer__container">
            {'seconds' in timeLeft
                ? <React.Fragment>
                    {timerParametrs?.map((parametr, index) =>
                        <div
                            key={index}
                            className="timer__parametr"
                        >
                            <p>{timeLeft[parametr]}</p>

                            <span>{parametr}</span>
                        </div>
                    )}
                </React.Fragment>
                : <div>
                    Days before trip...
                </div>
            }
        </div>
    )
}