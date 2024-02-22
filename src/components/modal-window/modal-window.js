import React, { useState, useEffect } from "react";
import { cityList } from "../../defaults";
import { dateToUnix, findLastTripId, tripPeriod } from "../../functions";
import "./style.css"

export default function ModalWindow(props) {
    const { handleChangeModalWindowStatus, setCurrentTripsData } = props
    const [newTripData, setNewTripData] = useState({ city: '', startDate: '', endDate: '', image: '' })
    const [newTripPeriod, setNewTripPeriod] = useState({ today: '', maxStartDate: '', maxEndDate: '', })

    useEffect(() => {
        const newTripPeriod = tripPeriod(newTripData?.startDate)

        setNewTripData(prevData => ({
            ...prevData,
            startDate: newTripPeriod?.today,
            endDate: newTripPeriod?.maxStartDate
        }))
    }, [])

    useEffect(() => {
        const newTripPeriod = tripPeriod(newTripData?.startDate)

        setNewTripPeriod(newTripPeriod)
    }, [newTripData?.startDate])

    function handleSelectCity(e) {
        setNewTripData(prevState => ({
            ...prevState,
            city: e.target.value,
            image: cityList?.find(city => (city?.city === e.target.value))?.image,
        }))
    }

    function handleStartDate(e) {
        setNewTripData(prevState => ({
            ...prevState,
            startDate: e.target.value,
        }))
    }
    function handleEndDate(e) {
        setNewTripData(prevState => ({
            ...prevState,
            endDate: e.target.value,
        }))
    }

    function createNewTripConfirm() {
        setCurrentTripsData(prevState => ([
            ...prevState,
            {
                ...newTripData,
                id: findLastTripId(prevState) + 1,
                startDate: dateToUnix(newTripData?.startDate),
                endDate: dateToUnix(newTripData?.endDate),
            },
        ]))

        handleChangeModalWindowStatus()
    }

    return (
        <div className="modal__container">
            <div className="modal">
                <div className="modal__header">
                    <h2>Create trip</h2>

                    <button
                        className="modal__close-button"
                        onClick={handleChangeModalWindowStatus}
                    >
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                </div>

                <hr />

                <form onSubmit={createNewTripConfirm}>
                    <div className="modal__input-container">
                        <label htmlFor="start_date">
                            <span>*</span> City:
                        </label>

                        <select
                            id="city"
                            name="city"
                            value={newTripData.city}
                            onChange={handleSelectCity}
                            required
                        >
                            <option value="">-- Select city --</option>
                            {cityList?.map((city, index) =>
                                <option
                                    key={index}
                                    value={city?.city}
                                >
                                    {city?.city}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="modal__input-container">
                        <label htmlFor="start_date">
                            <span>*</span> Start date:
                        </label>

                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={newTripData.startDate}
                            onChange={handleStartDate}
                            required
                            min={newTripPeriod?.today}
                            max={newTripPeriod?.maxStartDate}
                        />
                    </div>

                    <div className="modal__input-container">
                        <label htmlFor="end_date">
                            <span>*</span> End date:
                        </label>

                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={newTripData.endDate}
                            onChange={handleEndDate}
                            required
                            min={newTripData?.startDate}
                            max={newTripPeriod?.maxEndDate}
                        />
                    </div>

                    <hr />

                    <div className="modal__action-buttons">
                        <button
                            className="modal__button"
                            onClick={handleChangeModalWindowStatus}
                        >
                            Cancel
                        </button>

                        <button
                            className="modal__button modal__button_submit"
                            type='submit'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}