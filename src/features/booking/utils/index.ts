import axios from 'axios'

const calendarId = process.env.REACT_APP_CALENDAR_ID
const api_key = process.env.REACT_APP_API_KEY

export const addUserToCalendarEvent = async (eventId: string, userEmail: string | undefined | null, token: string | undefined) => {
    const user = {
        "attendees": [
            {
                "email": `${userEmail}`
            }
        ]
    }


    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?key=${api_key}&sendNotifications=true&sendUpdates=all`

    return axios.patch(calendarUrl, user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

}