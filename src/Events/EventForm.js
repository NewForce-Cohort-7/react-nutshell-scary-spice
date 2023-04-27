import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EventForm = ({updateEvent}) => {
    /*
         Add the correct default properties to the
        initial state object
    */
    const [event, update] = useState({
        name:"",
        date:"",
        location:""
        
    })
    /*
         Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()
    const localNutshellUser = localStorage.getItem("nutshell_user")
    const nutshellUserObject = JSON.parse(localNutshellUser)

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        //  Create the object to be saved to the API

        const ticketToSendToApi = {
            userId: nutshellUserObject.id,
            name: event.name,
            date: event.date,
            location: event.location
        }

        //  Perform the fetch() to POST the object to the API
        return fetch (`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToApi)
        })
        .then(response => response.json())
        .then(() => {
            fetch(`http://localhost:8088/events`)//gets stuff from api
            .then(r => r.json())//translates into JS
            .then( events => updateEvent(events))//utilizes the information
        
        })
    }

    return (
        <form className="eventForm"
        onSubmit={(clickEvent) => handleSaveButtonClick(clickEvent)}
        >
            <h2 className="eventForm__title">Add Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={event.name}
                        onChange={
                            (evt) => {
                                const copy = {...event}//creates copy of existing state
                                copy.name = evt.target.value
                                update (copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="text"
                        value={event.date}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.date = evt.target.value 
                                update (copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text"
                        value={event.location}
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.location = evt.target.value 
                                update (copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
            className="btn btn-primary">
                Submit event
            </button>
        </form>
    )
}