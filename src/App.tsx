import './App.css'
import Navbar from './Components/Navbar'
import {Outlet} from "react-router-dom";
import {volunteerDto} from "./dto/volunteer.dto";

function App() {

  const user : volunteerDto =
    {
    username: "test",
    firstName: "test",
    lastName: "test",
    email: "test",
  }

localStorage.setItem("user", JSON.stringify(user));


  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
