import { useEffect, useState } from "react"
import { EventForm } from "./EventForm"
import { EventList } from "./EventList"
import "./Events.css"

export const EventContainer = () => {
    const [events, setEvents] = useState([])

//state cannot be shared by sibilings. 
    useEffect(() => {
        fetch(`http://localhost:8088/events`)//gets stuff from api
        .then(r => r.json())//translates into JS
        .then( events => setEvents(events))//utilizes the information
    }, [])


    return (
    <>
     <EventForm updateEvent= {setEvents}/>
     <EventList events={events}/>
     </>
    )

}