
import { Events } from "./Events.js"
import { Container, Row, Col } from "react-bootstrap"

export const EventList = ({events}) => {


    return (

        <Container className="events_list">
            <Row>
            <Col lg={{span:8, offset:2}} className="agenda_container"></Col> <h1 className="event_header">Events</h1>
            <div className="eventList">
                {
                events.map(event => <Events key={event.id}  events={event}  />)
                }
            </div>
            </Row>
        </Container>
    )
}

