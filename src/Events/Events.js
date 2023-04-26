export const Events = ({events}) => {
    return (    
        <>
            <h2>{events.name}</h2>
            <ul>
                <li>{events.date}</li>
                <li>{events.location}</li>
            
            </ul>
        </>
    
    )
    
    
    }
 
