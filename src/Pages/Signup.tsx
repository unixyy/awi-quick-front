import {useState} from "react";
import axios from "axios";
import {signUpRoot} from "../routes/routes";
import Cookies from "js-cookie";

interface user {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export default function Signup(){

  const [user, setUser] = useState<user>({username: "",firstName:"",lastName:"",email:"", password: ""});
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(user.password !== confirmPassword){
      alert("Password and Confirm Password must match");
      return;
    }
    axios.post(signUpRoot, user).then((res) => {
      Cookies.set("token", res.data.access_token);
    }).catch((err) => {
      console.log(err);
    }
    );
  }
  return(
    <div>
      <div className="flex ml-10 md:ml-20 mb-6 md:mb-10 maroon-palet font-bold text-6xl mr-auto">Signup</div>
      <form className="flex flex-col w-1/2 mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={user.username} className="border-2 border-black rounded-lg p-2 mb-4 dark:bg-black dark:border-white" onChange={handleChange}/>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value={user.firstName} className="border-2 border-black rounded-lg p-2 mb-4 dark:bg-black dark:border-white" onChange={handleChange}/>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={user.lastName} className="border-2 border-black rounded-lg p-2 mb-4 dark:bg-black dark:border-white" onChange={handleChange}/>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value={user.email} className="border-2 border-black rounded-lg p-2 mb-4 dark:bg-black dark:border-white" onChange={handleChange}/>
        <label htmlFor="password">Password (must be more 8 characters) </label>
        <input type="password" id="password" name="password" value={user.password} className="border-2 border-black rounded-lg p-2 mb-4 dark:bg-black dark:border-white" onChange={handleChange}/>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} className="border-2 border-black rounded-lg p-2 mb-4 dark:bg-black dark:border-white" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
        <button type="submit" className="bg-black w-max text-white rounded-lg p-2">Submit</button>
      </form>
    </div>
  )
}