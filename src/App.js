import React, { useEffect, useState } from 'react';
import ModalWindow from './components/modal-window/modal-window';
import Search from './components/search/search';
import TripDailyWeather from './components/trip-daily-weather/trip-daily-weather';
import Sidebar from './components/sidebar/sidebar'
import TripList from './components/trip-list/trip-list';
import Header from './components/header/header'
import { getTripWeather } from './requests';
import { filterBySearch } from './functions';
import { tripData } from './defaults';
import './App.css';

function App() {
  const [handleSearchText, setHandleSearchText] = useState('')
  const [modalWindowStatus, setModalWindowStatus] = useState(false)
  const [currentTripsData, setCurrentTripsData] = useState([])
  const [currentTrip, setCurrentTrip] = useState({})
  const [tripDailyWeatherList, setTripDailyWeatherList] = useState([])
  const [sidebarData, setSidebarData] = useState({ tripStartDate: 0, currentWeatherInCity: {}, })

  useEffect(() => {
    console.log('start')
    if (localStorage.localTripList) {
      setCurrentTripsData([...JSON.parse(localStorage.localTripList)])
    } else {
      setCurrentTripsData([...tripData])
    }
  }, [tripData])

  useEffect(() => {
    if (currentTripsData?.length) {
      localStorage.setItem('localTripList', JSON.stringify(currentTripsData))
    }
  }, [currentTripsData])

  function handleChangeSearchText(e) {
    setHandleSearchText(e.target.value)
  }

  function handleChangeModalWindowStatus() {
    setModalWindowStatus(prevStatus => !prevStatus)
  }

  async function handleChangeEveryDayTripWeatcherBlockStatus(currentTripData) {
    const { city, startDate, endDate } = currentTripData

    const [dailyWeather, todayWeather] = await Promise.all([
      getTripWeather(city, startDate, endDate),
      getTripWeather(city)
    ])

    if (dailyWeather && todayWeather) {
      setCurrentTrip(currentTripData)

      setTripDailyWeatherList(dailyWeather?.days)

      setSidebarData(prevData => ({
        ...prevData,
        tripStartDate: startDate,
        currentWeatherInCity: todayWeather,
      }))
    }
  }

  return (
    <div className="container">
      <Header />

      <div className="wrap">
        <div className="main">
          <Search
            handleSearchText={handleSearchText}
            handleChangeSearchText={handleChangeSearchText}
          />

          <TripList
            tripList={filterBySearch(currentTripsData, handleSearchText)}
            currentTripId={currentTrip?.id}
            handleChangeEveryDayTripWeatcherBlockStatus={handleChangeEveryDayTripWeatcherBlockStatus}
            handleChangeModalWindowStatus={handleChangeModalWindowStatus}
          />

          <div className="main__trip-weather">
            <div className="main__trip-weather-header">
              <h2>Weather for each day of the trip to {currentTrip?.city || '(Choose trip)'}</h2>
            </div>

            <TripDailyWeather tripDailyWeatherList={tripDailyWeatherList} />
          </div>
        </div>

        <Sidebar sidebarData={sidebarData} />
      </div>

      {modalWindowStatus &&
        <ModalWindow
          handleChangeModalWindowStatus={handleChangeModalWindowStatus}
          setCurrentTripsData={setCurrentTripsData}
        />}
    </div>
  );
}

export default App