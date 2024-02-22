import React, { useEffect, useRef } from "react";
import { unixToDate } from "../../functions";
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

export default function TripList(props) {
    const { tripList, currentTripId, handleChangeEveryDayTripWeatcherBlockStatus, handleChangeModalWindowStatus } = props
    const scrollRef = useHorizontalScroll()

    return (
        <div
            className="trip-list"
            ref={scrollRef}
        >
            <div
                className="trip-card"
                onClick={() => handleChangeModalWindowStatus()}
            >
                <div className="new-trip-card">
                    <span className="material-symbols-outlined">
                        add
                    </span>

                    <h2>Add trip</h2>
                </div>
            </div>

            {tripList?.length !== 0
                ? <React.Fragment>
                    {tripList?.map((trip, index) =>
                        <TripCard
                            key={index}
                            currentTripId={currentTripId}
                            tripData={trip}
                            handleChangeEveryDayTripWeatcherBlockStatus={handleChangeEveryDayTripWeatcherBlockStatus}
                        />
                    )}
                </React.Fragment>
                : <div className="trip-not-found">
                    There are no trips based on your request
                </div>
            }
        </div>
    )
}

function TripCard(props) {
    const { handleChangeEveryDayTripWeatcherBlockStatus, tripData, currentTripId } = props
    const tripDate = `${unixToDate(tripData?.startDate)} - ${unixToDate(tripData?.endDate)}`
    const disabledCard = currentTripId === undefined
        ? ''
        : tripData?.id !== currentTripId ? ' trip-card_disabled' : ''

    return (
        <div
            className={`trip-card${disabledCard}`}
            onClick={() => handleChangeEveryDayTripWeatcherBlockStatus(tripData)}
        >
            <img
                src={tripData.image}
                title={tripData.city}
                alt={tripData.city}
            />

            <div className="trip-card__description">
                <h2>{tripData.city}</h2>

                <span>{tripDate}</span>
            </div>
        </div >
    )
}
