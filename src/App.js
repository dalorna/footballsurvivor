import './App.css';
import React, {useState} from "react";
import { BrowserRouter, Route, Routes, Link, useParams } from "react-router-dom";
import UserService from "./services/UserService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const userService = new UserService(process.env.REACT_APP_API);

function App() {
  return (
    <div>
        <div>
            <div>
                <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
            </div>
            <div>
                <small>REACT_APP_CLIENT_ID <b>{process.env.REACT_APP_CLIENT_ID}</b></small>
            </div>
            <div>
                <small>REACT_APP_KEY <b>{process.env.REACT_APP_KEY}</b></small>
            </div>
            <div>
                <small>REACT_APP_ENV <b>{process.env.REACT_APP_ENV}</b></small>
            </div>

            <h1>Hello World</h1>
        </div>
        <div>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/users">Users</a>
                    </li>
                    <li>
                        <a href="/profiles">Profiles</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/users/*" element={<Users />} />
                        <Route path={"/profiles"} element={<ProfileClick />} />
                    </Routes>
            </BrowserRouter>
        </div>
    </div>
  );
}

const useModalState = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return {show, handleClose, handleShow}
}

const Home = () => {
    return <h2>Home</h2>;
}

const About = () => {
    return <h2>About</h2>;
}

const Users = () => {
    const number = 17;
    return (
        <div>
            <h2>Users</h2>
            <ul>
                <li>
                    <Link to="entry">Entry</Link>
                </li>
                <li>
                    <Link to={`profile/${number}`}>Profile</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/entry" element={<UserEntry />} />
                <Route path="/profile/:id" element={<UserProfile />} />
            </Routes>
        </div>
    );
}

class ProfileClick extends React.Component {
    state = { profileData: []};
    handleClick = async () => {
        const response = await userService.GetUsers();
        console.log('response', response);
        this.setState({profileData: !!response && !!response.data ? response.data: []})
    }
    render() {
        return (
            <div>
                <h2>Profiles</h2>
                <button variant="primary" onClick={this.handleClick}>Click Me</button>
                <ul>
                    <li>Hello</li>
                    {
                        this.state.profileData.map((m, i) => <li key={i}>{m.userName}</li>)
                    }
                </ul>
            </div>
        );
    }
}

const UserProfile = () => {
    const {show, handleClose, handleShow} = useModalState();
    let {id} = useParams();
    const body = `Here is the id you seek... ${id}`
    return (
        <div>
            <h2>{'UserProfile Id: ' + id}</h2>
            <AppModal show={show} CloseModal={handleClose} ShowModal={handleShow} BodyModal={body} />
        </div>
    );
}

const UserEntry = () => {
    return <h2>User Entry</h2>;
}

const AppModal = (props) => {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={props.ShowModal}>
                Launch static backdrop modal
            </Button>

            <Modal show={props.show} onHide={props.CloseModal} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.BodyModal}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.CloseModal}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default App;
