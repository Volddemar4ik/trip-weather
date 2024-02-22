import { weekdays } from "./defaults"

export function dateToUnix(date) {
    const [year, month, day] = date.split('-')
    const currentDate = new Date(year, month - 1, day)

    return currentDate.getTime()
}

export function unixToDate(date) {
    const currentDate = new Date(date)

    const day = currentDate.getDate().toString().padStart(2, '0')
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const year = currentDate.getFullYear()

    return `${day}.${month}.${year}`
}

export function getIconUrl(iconName) {
    return `/icons/${iconName}.svg`
}

export function dayOfWeek(date) {
    const currentDate = new Date(date)

    return weekdays[currentDate.getDay()]
}

export function findLastTripId(array) {

    return array.reduce((max, obj) => Math.max(max, obj.id), -Infinity)
}

export function tripPeriod(startDate) {
    const today = new Date().toISOString().split('T')[0]

    const fifteenDaysFromToday = new Date()
    fifteenDaysFromToday.setDate(fifteenDaysFromToday.getDate() + 15)
    const maxStartDate = fifteenDaysFromToday.toISOString().split('T')[0]

    let maxEndDate
    if (startDate !== '') {
        const [year, month, day] = startDate?.split('-')
        const fifteenDaysFromStartDate = new Date(year, month - 1, day)
        fifteenDaysFromStartDate.setDate(fifteenDaysFromStartDate.getDate() + 15)
        maxEndDate = fifteenDaysFromStartDate.toISOString().split('T')[0]
    }

    return { today, maxStartDate, maxEndDate: maxEndDate || '' }
}

export function timeLeftTimer(date) {
    const difference = +new Date(date) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        }
    } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, }
    }

    return timeLeft
}

export function filterBySearch(array = [], searchText) {
    return array.filter(item => item?.city?.toLowerCase().includes(searchText.toLowerCase()))
}