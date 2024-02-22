import React, { useRef, useEffect } from "react";
import Icon from "../icon";
import { dayOfWeek } from "../../functions";
import './style.css'

function useHorizontalScroll() {
    const elRef = useRef()

    useEffect(() => {
        const el = elRef.current
        if (el) {
            const onWheel = e => {
                if (e.deltaY === 0) return

                e.preventDefault()

                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: "smooth"
                })
            }

            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel)
        }
    }, [])

    return elRef
}

export default function TripDailyWeather({ tripDailyWeatherList }) {
    const scrollRef = useHorizontalScroll()

    return (
        <div
            className="daily-weather__container"
            ref={scrollRef}
        >
            {tripDailyWeatherList !== 0 &&
                tripDailyWeatherList?.map((dayWeather, index) => (
                    <div
                        key={index}
                        className="daily-weather__day-card"
                    >
                        <div className="daily-weather__data">
                            <h3>{dayOfWeek(dayWeather?.datetime)}</h3>

                            <span>({dayWeather?.datetime})</span>
                        </div>

                        <div className="daily-weather__icon-container">
                            <Icon iconName={dayWeather?.icon} />
                        </div>

                        <div className="daily-weather__description">
                            <p>{dayWeather?.conditions}</p>
                        </div>

                        <div className="daily-weather__temperature">
                            <p>{dayWeather?.tempmin}&#176;/{dayWeather?.tempmax}&#176;</p>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}