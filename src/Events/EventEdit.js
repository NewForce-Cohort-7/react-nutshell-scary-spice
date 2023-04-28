import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EventEdit = () => {
    const [event, assignEvent] = useState({
        name: "",
        date: "",
        location: ""
 })
    const {eventId } = useParams()
    const navigate = useNavigate()

    //gets ticket state from the API
    useEffect(() => {
        fetch(`http://localhost:8088/events/${eventId}`)
            .then(response => response.json())
            .then((data) => {
                assignEvent(data)
            })
    }, [eventId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
//Put request to replace OBJ being edited. 
        return fetch(`http://localhost:8088/events/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/events")
            })
    }


    return <><form className="eventForm">
        <h2 className="eventForm__title">Events</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Name:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={event.name}
                    onChange={
                        (evt) => { //updates state with an edited copy
                            const copy = { ...event }
                            copy.description = evt.target.value
                            assignEvent(copy)
                        }
                    }>{event.name}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="text"
                    onChange={
                        (evt) => { //updates state with an edited copy
                            const copy = { ...event }
                            copy.date = evt.target.value
                            assignEvent(copy)
                        }
                    } />
            </div>
        </fieldset>
        <div className="form-group">
                <label htmlFor="location">Location:</label>
                <input type="text"
                    onChange={
                        (evt) => { //updates state with an edited copy
                            const copy = { ...event }
                            copy.location = evt.target.value
                            assignEvent(copy)
                        }
                    } /></div>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn-edit">
            Save Edits
        </button>
    </form>
    </>
}