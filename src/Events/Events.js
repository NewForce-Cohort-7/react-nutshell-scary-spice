export const Events = ({events}) => {
    return (    
        <>
            <ul class="agendaList">
                <li>{events.name}</li>
                <li>{events.date}</li>
                <li>{events.location}</li>
            
            </ul>
        </>
    
    )
    
    
    }
 
