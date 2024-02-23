import React, { useState, useEffect, useRef } from "react";
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
    const [sortedTripList, setSortedTripList] = useState([])
    const [sortedBy, setSortedBy] = useState('')
    const scrollRef = useHorizontalScroll()
    const [showScrollButtons, setShowScrollButtons] = useState(false)

    useEffect(() => {
        const container = scrollRef.current

        if (container.scrollWidth > container.clientWidth && sortedTripList?.length > 1) {
            setShowScrollButtons(true)
        } else {
            setShowScrollButtons(false)
        }
    }, [sortedTripList])

    const scroll = (scrollOffset) => {
        const container = scrollRef.current

        container.scrollTo({
            left: container.scrollLeft + scrollOffset,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        if (sortedBy !== '') {
            const tripListCopy = [...tripList]
            const order = +sortedBy ? 1 : -1

            const res = tripListCopy?.sort((a, b) => order * (a.startDate - b.startDate))

            setSortedTripList(res)
        } else {
            setSortedTripList(tripList)
        }
    }, [tripList, sortedBy])

    function handleSortedBy(e) {
        setSortedBy(e.target.value)
    }

    return (
        <div className="trip-list">
            <Sorting
                handleSortedBy={handleSortedBy}
                sortedBy={sortedBy}
            />

            <div
                className="trip-list__container"
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

                {sortedTripList?.length !== 0
                    ? <React.Fragment>
                        {sortedTripList?.map((trip, index) =>
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

            {showScrollButtons &&
                <React.Fragment>
                    <button
                        className="scroll-button scroll-button_left"
                        onClick={() => scroll(-200)}
                    >
                        <span className="material-symbols-outlined">
                            chevron_left
                        </span>
                    </button>
                    <button
                        className="scroll-button scroll-button_right"
                        onClick={() => scroll(200)}
                    >
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </button>
                </React.Fragment>
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

function Sorting(props) {
    const { sortedBy, handleSortedBy } = props

    return (
        <div className="sorting">
            <span>Sort trips by:</span>

            <select
                id="sort-by"
                name="sort-by"
                value={sortedBy}
                onChange={handleSortedBy}
                required
            >
                <option value="">Default</option>
                <option value="1">Earliest</option>
                <option value="0">Latest</option>
            </select>
        </div>
    )
}