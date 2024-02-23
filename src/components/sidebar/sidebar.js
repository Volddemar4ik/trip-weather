import React, { useState, useEffect, useMemo } from "react";
import Icon from "../icon";
import { timeLeftTimer, } from '../../functions'
import './style.css'

export default function Sidebar({ sidebarData }) {
    const [timeLeft, setTimeLeft] = useState(null)
    const currentCity = sidebarData?.currentWeatherInCity?.address
    const currentCityWeather = currentCity && sidebarData?.currentWeatherInCity?.days[0]
    const timerParametrs = ['days', 'hours', 'minutes', 'seconds',]

    useEffect(() => {
        if (sidebarData?.tripStartDate) {
            const tcurrentTimer = setTimeout(() => {
                setTimeLeft(timeLeftTimer(sidebarData?.tripStartDate))
            }, 1000)

            return () => clearTimeout(tcurrentTimer)
        }
    })

    const memoizedSidebarWeather = useMemo(() => {
        return (
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
        )
    }, [sidebarData])

    return (
        <div className="sidebar">
            {currentCity && timeLeft
                ? <div className="sidebar__container">
                    {memoizedSidebarWeather}

                    <Timer
                        timeLeft={timeLeft}
                        timerParametrs={timerParametrs}
                    />
                </div>
                : <div className="sidebar__empty">
                    No data

                    <span className="material-symbols-outlined">
                        cloud_off
                    </span>

                    Choose trip at first
                </div>
            }
        </div>
    )
}

function Timer(props) {
    const { timeLeft, timerParametrs } = props

    return (
        <div className="timer__container">
            {timeLeft !== null &&
                timerParametrs?.map((parametr, index) =>
                    <div
                        key={index}
                        className="timer__parametr"
                    >
                        <p>{timeLeft[parametr]}</p>

                        <span>{parametr}</span>
                    </div>
                )}
        </div>
    )
}