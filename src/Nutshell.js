import './Nutshell.css';
import Button from 'react-bootstrap/Button';
import NavBar from './nav/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Nutshell() {
  return (
    <div className="Dashboard">
      <NavBar />
      <header className="App-header">
        <h1 className="placeholderTitle">Welcome to Nutshell</h1>
        <Button>Test</Button>
      </header>
    </div>
  )
}

export default Nutshell
