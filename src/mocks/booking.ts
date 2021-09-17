
export const dayWith30MinutesIntervals = [
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30"]


export const dayWith1HourIntervals = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00"]



// get random times and availabale slots
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


// Get sub-array of first n elements after shuffled




export const MockavailableTimesArray = () => {

    return Array(4).fill(null).map((data, index) => {
        return {
            [`Aug-${index + 1}-2021`]:
                [dayWith30MinutesIntervals, dayWith1HourIntervals][getRandomInt(1)]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, getRandomInt(20))

        }
    })
}