import { useNavigate } from "react-router-dom"




export const Events = ({events}) => {
    const navigate = useNavigate()
    return (    
        <>
            <ul class="agendaList">
                <li>{events.name}</li>
                <li>{events.date}</li>
                <li>{events.location}</li>
            
            </ul>
            <button className= "editButton" onClick={() => navigate(`events/${events.id}/edit`)}>Edit Event</button>
        </>
    
    )
   
    
    }
 
