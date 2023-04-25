import './Nutshell.css';
import NavBar from './nav/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from './auth/Login';
import { Register } from "./auth/Register";
import { Authorized } from './views/Authorized';

const Nutshell= () => {
  return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}
export default Nutshell
