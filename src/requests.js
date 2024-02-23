import { endpoint, authEndpoint, apiKey } from "./defaults"

export async function getTripWeather(city, startDate, endDate) {
    const period = (startDate && endDate)
        ? `${startDate / 1000}/${endDate / 1000}`
        : 'today'
    const requestUrl = `${endpoint}/${city}/${period}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`

    try {
        const res = await fetch(requestUrl)

        if (!res.ok) {
            throw new Error(`Error in request: ${res.status}`)
        }

        const data = await res.json()

        return data
    } catch (error) {
        console.error('Error: ', error)

        throw error
    }
}

export async function googleAuth(token) {
    const requestUrl = `${authEndpoint}?access_token=${token}`

    try {
        const res = await fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })

        if (!res.ok) {
            throw new Error(`Error in request: ${res.status}`)
        }

        const data = await res.json()

        return data
    } catch (error) {
        console.error('Error: ', error)

        throw error
    }
}
