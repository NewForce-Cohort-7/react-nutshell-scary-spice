import { useNavigate } from "react-router-dom"
import { Container} from "react-bootstrap"




export const Events = ({events}) => {
    const navigate = useNavigate()
    return (    
        <>
            <ul className="agendaList">
                <li>{events.name}</li>
                <li>{events.date}</li>
                <li>{events.location}</li>
            
            </ul>
            <button className= "editButton" onClick={() => navigate(`events/${events.id}/edit`)}>Edit Event</button>
       
            </>
    )
   
    
    }
 
