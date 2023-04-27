import { useEffect, useState } from "react"
import { Events } from "./Events.js"

export const EventList = ({events}) => {


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

