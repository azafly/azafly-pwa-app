import axios from 'axios'

const calendarId = 'k0dcsbp91v7ft57bnskk9b2bo4@group.calendar.google.com'
const api_key = 'AIzaSyAOf2HX1Dha9St5MVKutzO5-P7JKM-KOCs'

export const addUserToCalendarEvent = (eventId: string, userEmail: string | undefined | null, token: string | undefined) => {

    const user = {
        "attendees": [
            {
                "email": `${userEmail}`
            }
        ]
    }



    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?key=${api_key}&sendNotifications=true&sendUpdates=all`
    axios.patch(calendarUrl, user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(result => console.log(result)).catch(error => console.log(error))

}