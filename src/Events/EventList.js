import { useEffect, useState } from "react"
import { Events } from "./Events.js"

export const EventList = () => {
const [events, setEvents] = useState([])


useEffect(() => {
    fetch(`http://localhost:8088/events`)
    .then(r => r.json())
    .then( events => setEvents(events))
}, [])

    return (

        <>
            <h1>Events</h1>
            <div className="eventList">
                {
                events.map(event => <Events key={event.id}  events={event}  />)
                }
            </div>
        </>
    )
}

