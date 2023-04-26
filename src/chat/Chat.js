import { Link } from "react-router-dom"

export const Chat = ({ id, message, email }) => {
    return <section className="chat">
        <div>
            <Link to={`/users/${id}`}>UserName: {email}</Link>
        </div>
        <div>Message: {message}</div>
        <div></div>
    </section>
}
